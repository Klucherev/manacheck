(function(){
	'use strict';
	
	angular
	.module('information')
	.controller('informationController', informationController);

	informationController.$inject = [
		'$scope',
		'$document',
		'$state', 
		'landsStorageFactory', 
		'colorsStorageFactory', 
		'calculationFactory'
	];

	function informationController(
			$scope,
			$document,
			$state, 
			landsStorageFactory, 
			colorsStorageFactory, 
			calculationFactory) {
		var vm = this;
		
		vm.canCompute = canCompute;
		vm.spellTypes = [
			{
				title: 'no specific type',
				value: undefined
			},
			{
				title: 'allies',
				value: 'allies'
			},
			{
				title: 'devoid',
				value: 'devoid',
			},
			{
				title: 'dragons',
				value: 'dragons'
			}
		];
		vm.cardsCountTypes = [
			{
				title: '60',
				value: 60
			},
			{
				title: '40',
				value: 40
			},
		];
		vm.cardsCount = vm.cardsCountTypes[0];
		vm.spellsType = vm.spellTypes[0];

		vm.submitData = submitData;
		function canCompute() {
			return !( (landsStorageFactory.getLands().count > 14) 
				&& colorsStorageFactory.getColors().count);
		}
		function submitData() {
			var params = {
				lands: landsStorageFactory.getLands(),
				colors: colorsStorageFactory.getColors().colors.map(function(colorItem) {
					return {
						color: colorItem.color,
						value: colorItem.value,
					}
				}),
				spellsType: vm.spellsType.value,
				cardsCount: vm.cardsCount.value,
			};

			var response = calculationFactory.calculate(params)
			.then(
				function(data) {
					$state.go('^.Results', 
						{
							isDataReady: true,
							rounds: data.rounds, 
							lands: data.hashes, 
							symbols: data.deckSymbols, 
							id: data.id
						}
					);
					return data;
				},
				function(error) {
					$state.go('^.Errors', {data: error.data, type: "invalid" });
				}
			);

		}

		function navigate(state) {
			$state.go(state);
		}
	}
})();