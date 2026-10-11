# v4 critique log (playwright 1440 + 390, local preview then live)

## Iteration 1 (i1-*.png)
What the screenshots show: a dark green summary band with four big mono metrics and pill chips, white cards with shadows on a green-gray canvas, a sticky "Today" panel with one lime primary action. It reads as a product, not a document. Problems:
1. "Sold today 0.5 / 0.5" with a full bar on day 2 next to "Resets in 12h" contradicts itself. The contract resets its counter lazily on the next call, so the label is wrong, not the number.
2. 390: the sales table overflows; the Size column is cut and Price/Hash are off screen.
3. Section links in the panel wrap into a ragged two-line group of ghost buttons; they look like loose text.
Smaller: the chart's first fill sits on the y-axis at "start", the label crowds the dot; the band headline wraps to 3 lines on mobile.
Fix the top 3 next.

## Iteration 2 (i2-*.png)
Fixed: window label now says "Counted toward the current window" with a note that it resets on the first call after 24h; Side/Hash hidden on mobile; section links are a scrollable pill row.
Still wrong:
1. 390: the sales table still clips the Price column. A table is the wrong shape at this width; use a card list on mobile.
2. 390: the three Price guard / Business stats stack into three tall boxes, wasting a screen. Keep them in a 3-up row with smaller numbers.
3. Chart: the fill label sits on top of the y-axis value and the dot at "start"; give it a pill background and offset.
Create page at 1440 looks right: one lime action, terms in a 2-column form, summary panel with chips.

## Iteration 3 (i3-*.png)
Fixed: mobile sales are a card list (size, price, time, hash all visible); Price guard stats stay 3-up on mobile; the fill label has a halo and sits above the dot.
Remaining, minor: the chart's first fill is at "start", so the black line hugs the axis; the jump-to pill row scrolls off the right edge by design. Moving to the independent critic and gates.
