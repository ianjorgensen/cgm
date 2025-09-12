<script>
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

  export let data
  export let range = null // { start, end }
  export let preset = 'N' // 'N' | 'T' | 'P'

  let root

  // thresholds / units helpers (match index.html behavior)
  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  function TH(){
    if (isMmol()) return { vlow:3.0, low:3.9, high:(preset==='T'||preset==='P')?7.8:10.0, vhigh:13.9 }
    // mg/dL
    if (preset==='T') return { vlow:54, low:70, high:140, vhigh:250 }
    if (preset==='P') return { vlow:54, low:63, high:140, vhigh:250 }
    return { vlow:54, low:70, high:180, vhigh:250 }
  }

  // Derived series
  let time, values
  const tStart = ()=> new Date(data.t0).getTime()
  $: if (data){
    time = Float64Array.from({length:data.glucose.length}, (_,i)=> tStart() + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  function computeWindow(){
    if (!values || !time) return { i0:0, i1: values?values.length-1:0 }
    if (!range) return { i0:0, i1: values.length-1 }
    const i0 = Math.max(0, Math.ceil((range.start - time[0]) / data.stepMs))
    const i1 = Math.min(values.length-1, Math.floor((range.end - time[0]) / data.stepMs))
    return { i0, i1 }
  }

  function pctOf(n, d){ return d ? Math.round(1000*n/d)/10 : 0 }

  function draw(){
    if (!root || !values) return
    const { i0, i1 } = computeWindow()
    const th = TH()
    const tightHigh = isMmol() ? 7.8 : 140
    let n=0, cVL=0,cL=0,cT=0,cH=0,cVH=0, cTight=0
    for (let i=i0;i<=i1;i++){
      const v=values[i]; if(!(Number.isFinite(v) && v>=0)) continue
      n++
      if (v < th.vlow) cVL++
      else if (v < th.low) cL++
      else if (v <= th.high) cT++
      else if (v <= th.vhigh) cH++
      else cVH++
      if (v >= th.low && v <= tightHigh) cTight++
    }
    const bands=[
      {name:'Very Low',  pct:pctOf(cVL,n), color:'#e57373', goal:'<1%'},
      {name:'Low',       pct:pctOf(cL,n),  color:'#ff9e80', goal:'<4%'},
      {name:'Target',    pct:pctOf(cT,n),  color:'#86c89d', goal:'≥70%'},
      {name:'High',      pct:pctOf(cH,n),  color:'#ffcc80', goal:'<25%'},
      {name:'Very High', pct:pctOf(cVH,n), color:'#f46d43', goal:'<5%'}
    ]

    const Hb=300
    const Wb = Math.max(320, root.getBoundingClientRect().width || 300)
    const Mb={t:20,r:80,b:30,l:30}
    const svg=d3.select(root).selectAll('svg').data([0]).join('svg')
      .attr('width',Wb).attr('height',Hb).style('overflow','visible')

    svg.selectAll('*').remove()
    const scaleY=d3.scaleLinear().domain([0,100]).range([Hb-Mb.b,Mb.t])

    // draw stacked bar + labels
    const labels=[]
    let yBoundaryHighTarget = null
    let yBoundaryVHighHigh = null
    let acc=0
    bands.forEach(b=>{
      const y0=scaleY(acc), y1=scaleY(acc+b.pct)
      svg.append('rect').attr('x',Mb.l).attr('y',y1)
        .attr('width',60).attr('height',Math.max(0,y0-y1))
        .attr('fill',b.color)
      if (b.name == 'High' || b.name == 'Low') {
        labels.push({ name:b.name, text:`${b.name} ${b.pct}%`, center:(y0+y1)/2, color:b.color })
      } else {
        labels.push({ name:b.name, text:`${b.name} ${b.pct}% (goal ${b.goal})`, center:(y0+y1)/2, color:b.color })  
      }
      
      if (b.name==='High')      yBoundaryHighTarget = y0
      if (b.name==='Very High') yBoundaryVHighHigh = y0
      acc+=b.pct
    })
    if (n===0){
      svg.append('rect').attr('x',Mb.l).attr('y',scaleY(100))
        .attr('width',60).attr('height',scaleY(0)-scaleY(100)).attr('fill','#e6e6e6')
    }

    // label placement to avoid overlap
    const minGap=14, yMin=Mb.t+8, yMax=Hb-Mb.b-8
    labels.sort((a,b)=>a.center-b.center)
    for(let i=0;i<labels.length;i++){
      const prev=labels[i-1]; let y=Math.max(yMin, Math.min(yMax, labels[i].center)); if(prev && y<prev.y+minGap) y=prev.y+minGap; labels[i].y=y
    }
    for(let i=labels.length-2;i>=0;i--){ const next=labels[i+1]; if(labels[i].y>next.y-minGap) labels[i].y=next.y-minGap; if(labels[i].y<yMin) labels[i].y=yMin }

    labels.forEach(l=>{
      svg.append('line').attr('x1',Mb.l+60).attr('x2',Mb.l+66).attr('y1',l.y).attr('y2',l.y)
        .attr('stroke',l.color).attr('opacity',0.8)
      svg.append('text').attr('x',Mb.l+70).attr('y',l.y).attr('dy','0.35em')
        .attr('fill','#000').attr('font-size',11).text(l.text)
        .attr('data-name', l.name)

      //svg.append('text').attr('x',Mb.l+70).attr('y',l.y).attr('dy','0.35em')
        //.attr('fill',l.color).attr('font-size',11).text(l.text)
        //.attr('data-name', l.name)
    })

    // Numeric threshold labels to the left of the bar at band boundaries
    try {
      const isM = isMmol()
      const labelHigh  = th.high
      const labelVHigh = th.vhigh
      const xTick = Mb.l - 6
      const styleText = (sel)=> sel.attr('text-anchor','end').attr('font-size',10).attr('font-weight',700).attr('fill','#000')//.attr('fill','#2f3741')
      if (yBoundaryHighTarget !== null){
        svg.append('text').attr('x', xTick).attr('y', yBoundaryHighTarget).attr('dy','0.35em').call(styleText).text(labelHigh)
      }
      if (yBoundaryVHighHigh !== null){
        svg.append('text').attr('x', xTick).attr('y', yBoundaryVHighHigh).attr('dy','0.35em').call(styleText).text(labelVHigh)
      }
    } catch {}

    //const color = '#6b7fa1'
    //const color2 = '#6b7fa1'
    const color = '#000'
    const color2 = '#000'

    // Combined line between High and Very High showing their sum
    try {
      const hv = labels.find(d=>d.name==='Very High')
      const h  = labels.find(d=>d.name==='High')
      if (hv && h){
        const yMid = (hv.y + h.y) / 2
        const sum = Math.round((bands[3].pct + bands[4].pct)*10)/10 // High + Very High
        const txt = `${sum}%  (goal ${bands[1].goal})`
        
        // Compute rightmost end of the two texts, then start combined line to the right of that
        const hvNode = svg.select('text[data-name="Very High"]').node()
        const hNode  = svg.select('text[data-name="High"]').node()
        let startX = Mb.l + 70
        try {
          const hvEnd = hvNode ? (parseFloat(hvNode.getAttribute('x')) + hvNode.getComputedTextLength()) : startX
          const hEnd  = hNode  ? (parseFloat(hNode.getAttribute('x'))  + hNode.getComputedTextLength())  : startX
          startX = Math.max(hvEnd, hEnd) + 12
        } catch {}
        svg.append('line').attr('x1',startX-6).attr('x2',startX).attr('y1',yMid).attr('y2',yMid)
          .attr('stroke',color).attr('opacity',0.9)
        svg.append('text').attr('x',startX+4).attr('y',yMid).attr('dy','0.35em')
          .attr('fill',color).attr('font-size',11).text(txt)
      }
      // Low + Very Low combined line
      const vl = labels.find(d=>d.name==='Very Low')
      const l  = labels.find(d=>d.name==='Low')
      if (vl && l){
        const yMid2 = (vl.y + l.y) / 2
        const sum2 = Math.round((bands[0].pct + bands[1].pct)*10)/10
        const txt2 = `${sum2}% (goal ${bands[3].goal})`
        
        let startX2 = Mb.l + 70
        try {
          const lNode  = svg.select('text[data-name="Low"]').node()
          const vlNode = svg.select('text[data-name="Very Low"]').node()
          const lEnd  = lNode  ? (parseFloat(lNode.getAttribute('x'))  + lNode.getComputedTextLength())  : startX2
          const vlEnd = vlNode ? (parseFloat(vlNode.getAttribute('x')) + vlNode.getComputedTextLength()) : startX2
          startX2 = Math.max(lEnd, vlEnd) + 12
        } catch {}
        svg.append('line').attr('x1',startX2-6).attr('x2',startX2).attr('y1',yMid2).attr('y2',yMid2)
          .attr('stroke',color2).attr('opacity',0.9)
        svg.append('text').attr('x',startX2+4).attr('y',yMid2).attr('dy','0.35em')
          .attr('fill',color2).attr('font-size',11).text(txt2)
      }
    } catch {}
  }

  onMount(()=>{ draw() })
  $: if (data && (range || true) && preset){ draw() }
</script>

<div bind:this={root} />
