$(document).ready(function() {

  var width = 650;
	var height = 470;

	count = 0;
	elements = new Array();

	var el = $('#mosaic');

	el.width(width).height(height);

	var horizontal_pieces = 8;
	var vertical_pieces = 6;
	total_pieces = horizontal_pieces * vertical_pieces;

	var box_width = width / horizontal_pieces;
	var box_height = height / vertical_pieces;

	var vertical_position = 0;

  for (i=0; i<total_pieces; i++)
	{
		var tempEl = $('<span class="hover" id="hover-' + i + '"></span>');

		var horizontal_position = (i % horizontal_pieces) * box_width;

		if(i > 0 && i % horizontal_pieces == 0)
		{
			vertical_position += box_height;
		}

		tempEl.css('background-position', '-' + horizontal_position + 'px -' + vertical_position + 'px');

		el.append(tempEl);
		elements.push(tempEl);
	}

  elements = shuffleArray(elements);

  $('#mosaic .hover').width(box_width).height(box_height);

  setInterval(toggleDisplay, 1000);
});

function toggleDisplay()
{
	var tempEl = elements[count];
	var opacity = tempEl.css('opacity');

	if(opacity == 0)
	{
		tempEl.animate({ opacity: 1 })
	}
	else
	{
		tempEl.animate({ opacity: 0 })
	}

	count = (count + 1) % total_pieces;
}

/* shuffleArray source: http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array#12646864 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
