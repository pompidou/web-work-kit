# Tricks

Some small web development wisdoms I picked up along the way.


## CSS

### Horizontal 'Use Remaining Space' Layout

If you can use Flexbox, then this is no problem at all. Otherwise:


#### HTML

	<div class="remaining-space-layout remaining-space-layout--right">
		<div class="remaining-space-layout__defining-element" style="width: 100px;">I use only the width I need.</div>
		<div class="remaining-space-layout__remaining-element">I use the remaining width.</div>
	</div>


#### CSS (SASS)

Using CSS tables:
	.remaining-space-layout {
		display: table;
		width: 100%;
	}
	.remaining-space-layout__defining-element,
	.remaining-space-layout__remaining-element {
		display: table-cell;
	}
	.remaining-space-layout__remaining-element {
		width: 100%;
	}
	
Using floats:
	.remaining-space-layout {
		// clearfix
		&:before, &:after {
			content: '';
			display: table;
		}
		&:after {
			clear: both;
		}
	}
	.remaining-space-layout__defining-element {
		.remaining-space-layout--right & {
			float: left;
		}
		.remaining-space-layout--left & {
			float: right;
		}
	}
	.remaining-space-layout__remaining-element {
		overflow: hidden;
	}
