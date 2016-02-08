(function(){
	'use strict';
	
	angular
	.module('lands')
	.controller('landsController', landsController);

	landsController.$inject = ['landsFactory'];

	function landsController(landsFactory, landsStorageFactory, landsHelper) {

		var vm = this;
		vm.typesFilter = [];
		vm.colorsFilter = [];
		vm.colorsList = ['red', 'green', 'blue', 'white', 'black', 'colorless'];
		vm.typesList = ['basic', 'gain', 'battle', 'fetch', 'pain', 'tri', 'dual', 'man', 'tribal', 'other'];
		
		vm.toggleFilter = toggleFilter;
		vm.isActiveFilter = isActiveFilter;

		
		landsFactory.getLands()
		.then(function(lands) {
			vm.landsList = lands;
		});

		function toggleFilter(filter, item) {
			var index = filter.indexOf(item);
			if (-1 === index) {
				filter.push(item);
			}
			else {
				filter.splice(index, 1);
			}
		}

		function isActiveFilter(filter, item) {
			return (-1 !== filter.indexOf(item));
		}

		
	}
})();