class Map{
	constructor(id,grid){
		this.id = id;
		this.grid = grid;
		this.setup();

	}
	
	getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	setup(){
		var svg = d3.select(this.id);
		var self = this;
		
		//Assume square grid
		var map_size = this.grid.length,
			tile_size_x = (+svg.style("width").slice(0,-2))/map_size,
			tile_size_y = (+svg.style("height").slice(0,-2))/map_size,
			tile_size = Math.max(Math.max(tile_size_x,tile_size_y),40);

		var offset = tile_size*0.99;
		
		svg
			.style('width',offset*map_size+'px')
			.style('height',offset*map_size+'px');
		

		console.log(svg.style("height"))
		console.log(map_size)
		console.log(tile_size)
				
		var myimage_grid = svg
			.selectAll('g')
			.data(this.grid)
			.enter()
			.append('g')
			.attr("transform",(d,i)=>'translate(0,'+(i*offset )+')')

		var myimages = myimage_grid
			.selectAll('image')
			.data((d)=>Object.values(d).slice(0,-1))
			.enter()
			.append('image')
			.attr('xlink:href', (d)=>'http://localhost:9001/images/test_image.png')
			.attr('width', tile_size)
			.attr('height', tile_size )
			.attr('preserveAspectRatio',"none")
			.attr("transform",(d,i)=>'translate('+i*offset+',0)')
			.on('drag',function(d){
				var coordinates= d3.mouse(this);
				var x = coordinates[0];
				var y = coordinates[1];
				console.log(this)
				console.log(event)
				console.log(event.target)
				
				d3.select(event.target).attr("transform",'translate('+x+','+y+')')
				
			});
			
			var dragHandler = d3.drag()
				.on("drag", function () {
					d3.select(this)
						.attr("transform",'translate('+(d3.event.x-offset/2)+','+(d3.event.y-offset/2)+')');
				})
				.on("end", function () {
					console.log("Modulo");
					console.log(offset);
					console.log(d3.event.y/offset);

					var x = Math.floor(d3.event.x/offset)*offset;
					var y = Math.floor(d3.event.y/offset)*offset;
					d3.select(this).attr("transform",'translate('+(x)+','+(y)+')').raise();
					d3.select(this.parentNode).raise();
				});

			// dragHandler(svg.selectAll("image"));
			this.offset=offset;
		 }
		 
		 get_tile_size(){
			 return this.offset;
		 }
}