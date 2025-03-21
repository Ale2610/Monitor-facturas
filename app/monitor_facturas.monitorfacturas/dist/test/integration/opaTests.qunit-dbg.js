sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/monitorfacturas/test/integration/FirstJourney',
		'monitorfacturas/monitorfacturas/test/integration/pages/FacturasList',
		'monitorfacturas/monitorfacturas/test/integration/pages/FacturasObjectPage'
    ],
    function(JourneyRunner, opaJourney, FacturasList, FacturasObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/monitorfacturas') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheFacturasList: FacturasList,
					onTheFacturasObjectPage: FacturasObjectPage
                }
            },
            opaJourney.run
        );
    }
);