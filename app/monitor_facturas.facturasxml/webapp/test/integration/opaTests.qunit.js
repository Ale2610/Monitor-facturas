sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/facturasxml/test/integration/FirstJourney',
		'monitorfacturas/facturasxml/test/integration/pages/FacturasMain'
    ],
    function(JourneyRunner, opaJourney, FacturasMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/facturasxml') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheFacturasMain: FacturasMain
                }
            },
            opaJourney.run
        );
    }
);