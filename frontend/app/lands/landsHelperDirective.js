(function(){
	'use strict';
	
	angular
	.module('lands')
	.directive('landsHelper', landsHelper);

	function landsHelper() {

		helper.$inject =['landsStorageFactory', 'landsFactory'];
		function helper(landsStorageFactory, landsFactory) {
			

			var vm = this;
			vm._lands = landsStorageFactory.getLands();
			vm.addLand = addLand;
			vm.canAddLand = canAddLand;
			vm.removeLand = removeLand;
			vm.canRemoveLand = canRemoveLand;
			vm.getLandCount = getLandCount;

			function addLand(land) {
				landsStorageFactory.addLand(land);
			}
			function removeLand(land) {
				landsStorageFactory.removeLand(land);
			}

			function canAddLand(land) {
				var landObj = landsFactory.getLandById(land.id);
				return (landObj.type === 'basic') || (getLandCount(land) < 4);
			}

			function canRemoveLand(land) {
				return  (getLandCount(land) > 0);
			}
			function getLandCount(land) {
				return landsStorageFactory.getLandCount(land);
			}
			
		}

		return {
			restrict: 'A',
			controller: helper,
			controllerAs: 'llCtrl'
		};
	}
})();