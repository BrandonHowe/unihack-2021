const ArcArticle = `
## Dilated circles and sectors

All circles are similar, because we can map any circle onto another using just rigid transformations and dilations. Circles are not all congruent, because they can have different radius lengths.

A **sector** is the portion of the interior of a circle between two radii. Two sectors must have congruent central angles to be similar.

An **arc** is the portion of the circumference of a circle between two radii. Likewise, two arcs must have congruent central angles to be similar.

Circle B and its sector are dilations of circle A and its sector with a scale factor of 3.

## Reasoning about ratios
When we studied right triangles, we learned that for a given acute angle measure, the ratio $\\dfrac{\\text{opposite leg length}}{\\text{hypotenuse length}}$ fraction was always the same, no matter how big the right triangle was. We call that ratio the sine of the angle.
Something very similar happens when we look at the ratio $\\dfrac{\\text{arc length}}{\\text{radius length}}radius$ in a sector with a given angle.
The sectors in these two circles have the same central angle measure.

### Claims

- Circle 2 is a dilation of circle 1.
- If the scale factor from circle 1 to circle 2 is $\\purpleD{k}$, then $r_2=\\purpleD{k}r_1$
- The arc length in circle 1 is $\\redE{\\ell_1}=\\redE{\\dfrac{\\theta}{360\\degree} \\cdot 2\\pi r_1}$
- By the same reasoning, the arc length in circle 2 is $\\goldE{\\ell_2}=\\goldE{\\dfrac{\\theta}{360\\degree } \\cdot 2\\pi r_2}​$
- By substituting, we can rewrite that as $\\goldE{\\ell_2}=\\dfrac{\\theta}{360\\degree } \\cdot 2\\pi \\purpleD{k}{r_1}$​
- So $\\goldE{\\ell_2}=\\purpleD{k}\\redE{\\ell_1}$

In conclusion, $\\dfrac{\\redE{\\ell_1}}{r_1}=\\dfrac{\\goldE{\\ell_2}}{r_2}$

## Conclusion

The ratio of arc length to radius length is the same in any two sectors with a given angle, no matter how big the circles are!

## A new ratio and new way of measuring angles

For any angle, we can imagine a circle centered at its vertex. The radian measure of the angle equals the ratio $\\dfrac{\\text{arc length}}{\\text{radius}}$. The angle has the same radian measure no matter how big the circle is.

## More ways of describing radians

One radian is the angle measure that we turn to travel one radius length around the circumference of a circle.

So radians are the constant of proportionality between an arc length and the radius length.

$\\begin{aligned}\\theta&=\\dfrac{\\text{arc length}}{\\text{radius}}\\\\\\\\ \\theta \\cdot \\text{radius}&=\\text{arc length} \\end{aligned}​$

It takes $2\\pi$ radians (a little more than $6$ radians) to make a complete turn about the center of a circle. This makes sense, because the full circumference of a circle is $2\\pi r$, or $2\\pi$ radius lengths.

## Why use radians instead of degrees?

Just like we choose different length units for different purposes, we can choose our angle measure units based on the situation as well.

Degrees can be helpful when we want to work with whole numbers, since several common fractions of a circle have whole numbers of degrees. Radians can simplify formulas, especially when we're finding arc lengths.

There several other ways of measuring angles, too, such as simply describing the number of full turns or dividing a full turn into 100 equal parts. The most important thing is to make sure you've communicated which measurement you're using, so everyone understands how much of a rotation there is between the rays of the angle.`

export default ArcArticle;