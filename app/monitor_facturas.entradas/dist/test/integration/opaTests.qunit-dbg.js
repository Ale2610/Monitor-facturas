sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/entradas/test/integration/FirstJourney',
		'monitorfacturas/entradas/test/integration/pages/EntradaList',
		'monitorfacturas/entradas/test/integration/pages/EntradaObjectPage'
    ],
    function(JourneyRunner, opaJourney, EntradaList, EntradaObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/entradas') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEntradaList: EntradaList,
					onTheEntradaObjectPage: EntradaObjectPage
                }
            },
            opaJourney.run
        );
    }
);