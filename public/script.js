
d3.json('/api/data').then(data => {
 
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    
   
    table.innerHTML = '';

   
    data.forEach(item => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = item.branch; 
        cell2.textContent = item.quantity;
    });


    const chartData = data.map(item => ({
        branch: item.branch,
        quantity: item.quantity
    }));

   
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  
    const svg = d3.select('#bar-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

   
    const x = d3.scaleBand()
        .domain(chartData.map(d => d.branch))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.quantity)])
        .nice()
        .range([height - margin.bottom, margin.top]);


    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');


    svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, 's'))
        .append('text')
        .attr('x', 2)
        .attr('y', y(y.ticks().pop()) + 0.5)
        .attr('dy', '0.32em')
        .attr('fill', '#000')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')
        .text('Количество');

   
    svg.selectAll('.bar')
        .data(chartData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.branch))
        .attr('y', d => y(d.quantity))
        .attr('width', x.bandwidth())
        .attr('height', d => height - margin.bottom - y(d.quantity))
        .attr('fill', '#69b3a2'); 

});
