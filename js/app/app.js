
    console.log("Iniciando aplicacion");

    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#paper'),
        //width: 600,
        //height: 200,
        model: graph,
        gridSize: 10
    });

    paper.fitToContent();

    var defaultPersonRect = new joint.shapes.basic.Rect({
            position: { x: 100, y: 30 },
            size: { width: 100, height: 30 },
            attrs: { 
                rect: { fill: '#2C3E50', rx: 5, ry: 5, 'stroke-width': 2, stroke: 'black' }, 
                text: { 
                     fill: '#3498DB', 
                    'font-size': 16, 
                    'font-weight': 'bold', 
                    'font-variant': 'small-caps', 
                    'text-transform': 'capitalize'    
                } 
            }
        });

    var addPerson = function(){
        var personName = $("#personName").val();
        var rect = defaultPersonRect.clone();
        rect.attr({
            text: { text: personName }
        })

        graph.addCell(rect);
    }

    $("#createPerson").on( "click", addPerson);

    var component1 = null;
    var component2 = null;

    paper.on('cell:pointerdblclick', function(cellView, evt, x, y) {

        if (component1 == null && component2 == null) {
            component1 = cellView;
        } else if (component1 != null && component2 == null) {
            component2 = cellView;
            // TODO conectar componentes y limpiar
            graph.addCell(new joint.dia.Link({
                source: { id: component1.model.id }, 
                target: { id: component2.model.id },
            }));
            // limpiar
            component1 = null;
            component2 = null;
        }

        // Find the first element below that is not a link nor the dragged element itself.
        // var elementBelow = graph.get('cells').find(function(cell) {
        //     if (cell instanceof joint.dia.Link) return false; // Not interested in links.
        //     if (cell.id === cellView.model.id) return false; // The same element as the dropped one.
        //     if (cell.getBBox().containsPoint(g.point(x, y))) {
        //         return true;
        //     }
        //     return false;
        // });
        
        // // If the two elements are connected already, don't
        // // connect them again (this is application specific though).
        // if (elementBelow && !_.contains(graph.getNeighbors(elementBelow), cellView.model)) {
            
        //     graph.addCell(new joint.dia.Link({
        //         source: { id: cellView.model.id }, target: { id: elementBelow.id },
        //         attrs: { '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z' } }
        //     }));
        //     // Move the element a bit to the side.
        //     cellView.model.translate(-200, 0);
        // }
    });    


    var initializeGraph = function(graphic){


        var rect2 = rect.clone();
        rect2.translate(300);

        rect2.attr({
            rect: { fill: '#2C3E50', rx: 5, ry: 5, 'stroke-width': 2, stroke: 'black' },
            text: {
                text: 'rectangle 2', 
                fill: '#3498DB', 
                'font-size': 16, 
                'font-weight': 'bold', 
                'font-variant': 'small-caps', 
                'text-transform': 'capitalize'
            }
        });

        var link = new joint.dia.Link({
            source: { id: rect.id },
            target: { id: rect2.id }
        });

        link.set('smooth', true)

        link.attr({
            '.connection': { stroke: 'blue' },
            '.marker-source': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },
            '.marker-target': { fill: 'yellow', d: 'M 10 0 L 0 5 L 10 10 z' }
        });

        var circ = new joint.shapes.basic.Circle({
            position: { x: 100, y: 70 },
            size: { width: 100, height: 30 },
            attrs: { 
                circle: { 
                    fill: 'red',
                    'stroke-width': 2, 
                    stroke: 'black' 
                }, 
                text: { text: 'my circle', fill: 'white' } 
            }
        });
        /*graph.on('all', function(eventName, cell) {
            console.log(arguments);
        });*/

        /*rect.on('change:position', function(element) {
            console.log(element.id, ':', element.get('position'));
        });*/
        graphic.addCells([rect, rect2, link, circ]);
    }
        
    // initializeGraph(graph)
