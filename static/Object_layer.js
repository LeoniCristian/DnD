function append(){
	// d3.select(svg).append('ul').append('li').text("MOM").on('click',append);

	d3.select('svg')
			.append('image')
			.attr('xlink:href', (d)=>'http://localhost:9001/test_image.png')
			.attr('width', 100)
			.attr('height', 100 )
			.attr('preserveAspectRatio',"none")
	d3.event.stopPropagation()
}

class Object_layer{
	constructor(id,tile_size){
		this.id = id;
		this.tile_size = tile_size;

		this.setup();

	}
	
	setup(){
		var menu = d3.select(this.id).append('div')
			.style('height','fill')
			.style('width','fill')
			.style('position',' absolute')
			.style('top',' 0')
			.style('right','0')
			.style('background','white');
			
		menu.append('ul').append('li')
			.text("- Hello!")
			.style('border','2px solid #000')
			.on('click',append);
		var svg = d3.select(this.id).select('svg');
		var self = this;
		
		 }
}