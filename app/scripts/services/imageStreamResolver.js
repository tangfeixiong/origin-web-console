'use strict';

angular.module('openshiftConsole')
.factory('ImageStreamResolver', function($q, DataService) {
  function ImageStreamResolver() {
  }

  // pods - the pods to check for referenced images
  // imagesByDockerReference - a map where any loaded images will be stored by their Docker image reference
  // imageStreamImageRefByDockerReference - a map of imageStreamImage names by their Docker image reference, should be generated by buildDockerRefMapForImageStreams
  // context - the context to be passed to any server requests, in general this is the $scope of the calling controller
  // returns a promise that will be resolved when all referenced images are loaded
  ImageStreamResolver.prototype.fetchReferencedImageStreamImages = function(pods, imagesByDockerReference, imageStreamImageRefByDockerReference, context) {
    var promises = [];
    angular.forEach(pods, function(pod){
      angular.forEach(pod.spec.containers, function(container){
        var dockerRef = container.image;
        if (imagesByDockerReference[dockerRef]) {
          // Already have an image for this ref
          return;
        }

        var imageStreamImageRef = imageStreamImageRefByDockerReference[dockerRef];
        if (!imageStreamImageRef) {
          // This docker ref doesn't come from an image stream we know about
          return;
        }

        var imageStreamImagePromise = DataService.get("imagestreamimages", imageStreamImageRef, context);
        imageStreamImagePromise.then(function(image) {
          imagesByDockerReference[dockerRef] = image;
        });
        promises.push(imageStreamImagePromise);
      });
    });
    return $q.all(promises);
  };

  // imageStreams - the image streams to process
  // imageStreamImageRefByDockerReference - a map that will be filled out with imageStreamImage names by their Docker image reference
  ImageStreamResolver.prototype.buildDockerRefMapForImageStreams = function(imageStreams, imageStreamImageRefByDockerReference) {
    angular.forEach(imageStreams, function(imageStream) {
      angular.forEach(imageStream.status.tags, function(tag){
        angular.forEach(tag.items, function(image){
          if (image.image) {
            // TODO if the API starts returning us the imageStreamImage name use that instead of building it ourselves
            imageStreamImageRefByDockerReference[image.dockerImageReference] = imageStream.metadata.name + "@" + image.image;
          }
        });
      });
    });
  };

  return new ImageStreamResolver();
});
