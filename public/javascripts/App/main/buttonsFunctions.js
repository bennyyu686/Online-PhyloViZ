function loadButtonFunctions(){

	return {

		numberOfNodes: function(graphObject){

			var graph = graphObject.graphInput;

			$('#numberOfNodes').append(' '+ graph.nodes.length);

		},

		pauseButton: function(graphObject){

			var graph = graphObject.graphInput;
			var renderer = graphObject.renderer;

			if (Object.keys(graph.positions).length > 0){
		        renderer.pause();
		        $('#pauseLayout')[0].innerHTML = "Resume Layout";
		        $('#iconPauseLayout').toggleClass('glyphicon glyphicon-pause',false);
		        $('#iconPauseLayout').toggleClass('glyphicon glyphicon-play',true);
		    }

		    $('#pauseLayout').click(function(e) {
	              e.preventDefault();
	              if($('#pauseLayout')[0].innerHTML == "Pause Layout"){
	                renderer.pause();
	                $('#pauseLayout')[0].innerHTML = "Resume Layout";
	                $('#iconPauseLayout').toggleClass('glyphicon glyphicon-pause',false);
	                $('#iconPauseLayout').toggleClass('glyphicon glyphicon-play',true);
	              }
	              else{ 
	                renderer.resume();
	                $('#pauseLayout')[0].innerHTML = "Pause Layout";
	                $('#iconPauseLayout').toggleClass('glyphicon glyphicon-play',false);
	                $('#iconPauseLayout').toggleClass('glyphicon glyphicon-pause',true);
	                
	              }
	        });
		},


		graphicButtons: function(graphObject){

			$('#NodeSizeSlider').change(function(e){
	            NodeSize(this.value, this.max, graphObject);
	        });

          	$('#NodeLabelSizeSlider').change(function(e){
            	LabelSize(this.value, graphObject, graphObject.nodeLabels, 'node');
          	});

          	$('#LinkLabelSizeSlider').change(function(e){
            	LabelSize(this.value, graphObject, graphObject.linkLabels, 'link');
          	});

          	$("#SpringLengthSlider").attr({
		         "max" : graphObject.maxLinkValue,
		    });

          	$('#SpringLengthSlider').change(function(e){
	            changeSpringLength(this.value, this.max, graphObject);
	        });


	        $('#AddLabels').change(function(e){
	            if (this.checked){
	              $('.node-label').css('display','block');
	              graphObject.tovisualizeLabels = true;
	            } 
	            else{
	              $('.node-label').css('display','none');
	              graphObject.tovisualizeLabels = false;
	            } 
          	});

          	$('#AddLinkLabels').change(function(e){
	            if (this.checked){
	              $('.link-label').css('display','block');
	              for (i in graphObject.removedLinks){
	                var labelStyle = linkLabels[graphObject.removedLinks[i].id].style;
	                labelStyle.display = "none";
	              }
	              graphObject.tovisualizeLinkLabels = true;
	            } 
	            else{
	              $('.link-label').css('display','none');
	              graphObject.tovisualizeLinkLabels = false;
	            } 
          	});

		},


		operationsButtons: function(graphObject){

			$('#distanceButton').click(function(e){
	            if (graphObject.selectedNodes.length < 2) alert('To compute distances, first you need to select more than one node.');
	            else checkLociDifferences(graphObject.selectedNodes, graphObject.graphInput.metadata);
	        });

	        $('#savePositionsButton').click(function(e){
	            saveTreePositions(graphObject);
	        });

	        $('#generatePublicLinkButton').click(function(e){
	            generatePublicLink(graphObject.datasetID);
	        });

	        $('#saveImageButton1').click(function(e){
	            printDiv(graphObject.width, graphObject.height);
	        });

	        $("#SplitTreeSlider").attr({
		        "max" : graphObject.maxLinkValue,
		        "value" : graphObject.maxLinkValue 
		    });

		    $("#NLVnumber").attr({
		        "max" : graphObject.maxLinkValue,
		        "value" : 0
		    });

	        $('#SplitTreeSlider').change(function(e){
	            splitTree(graphObject, this.value);
	        });

	        $('#NLVnumber').change(function(e){
            	NLVgraph(graphObject, this.value);
          });
		},

		searchButton: function(graphObject){

			$('#searchForm').submit(function(e) {
                  e.preventDefault();
                  var nodeId = $('#nodeid').val();
                  centerNode(nodeId, graphObject);
              });
		}

	}
}