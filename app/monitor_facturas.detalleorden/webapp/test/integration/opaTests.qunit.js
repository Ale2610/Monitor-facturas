sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/detalleorden/test/integration/FirstJourney',
		'monitorfacturas/detalleorden/test/integration/pages/DetalleOrdenCompraMain'
    ],
    function(JourneyRunner, opaJourney, DetalleOrdenCompraMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/detalleorden') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDetalleOrdenCompraMain: DetalleOrdenCompraMain
                }
            },
            opaJourney.run
        );
    }
);