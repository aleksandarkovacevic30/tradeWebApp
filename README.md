creating small web app.

_TODO_

- check image (png) checkup algorithms. Greyscale vs. color can be recognized by looking for a pixel that is colorful (in rgb coded colors, r=g=b is greyscale)
- to read png image, pixel per pixel, look for solutions under
[http://stackoverflow.com/questions/11247790/reading-a-png-image-in-node-js]

- owned resource issue, how to bind a mongodb referenced object to a new object.
  - first solution, forget about MongoDB ref and add name which would be validated. resources as documents are in the most of the running process a read-only values. Actually, should it be in DB at all? It needs to be maintained, so CRUD methods are required, but does it deserve its own DB? AAAaaaaah... define Id manually to be name of the resource. that would resolve a lot of issues. However, it is still running away from the problem... how would one do that in general case.
  - second solution, while creating such object, show combobox with possible resources to be referenced with, and use selected resource by id. 