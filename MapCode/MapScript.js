
            //Doing the movable box stuff
            var handler = document.querySelector('.dividingElement');
            var wrapper = handler.closest('.MapContainer');
            var boxA = wrapper.querySelector('.movablebox');
            var isHandlerDragging = false;

            document.addEventListener('mousedown', function(e) {
            // If mousedown event is fired from .handler, toggle flag to true
                if (e.target === handler) {
                    isHandlerDragging = true;
                }
            });

            document.addEventListener('mouseup', function(e) {
                // Turn off dragging flag when user mouse is up
                isHandlerDragging = false;
            });

            document.addEventListener('mousemove', function(e) {
                // Don't do anything if dragging flag is false
                if (!isHandlerDragging) {
                    return false;
                }

                // Get offset
                var containerOffsetLeft = wrapper.offsetLeft;

                // Get x-coordinate of pointer relative to container
                var pointerRelativeXpos = e.clientX - containerOffsetLeft;
                
                // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
                //var boxAminWidth = 0;

                
                //boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 10)) + 'px';
                boxA.style.width = (pointerRelativeXpos - 10) + 'px';
                boxA.style.flexGrow = 0;
            });


            //create the map and its coordinates
            var map = L.map('map').setView([42.982521, -117.054526], 18);
            //map.setMaxBounds(map.getBounds());//this makes the total map bounds just what the initial image was, easy solution and I am lazy.
            //The setMaxBounds was annoying and I disliked it, so it is gone now. 
            
        
            let markersLayer = new L.LayerGroup().addTo(map);
            const listItems = document.getElementById('maplist');
        
        
            //The place where I construct and add the map and list markers/list elements
            function addMarkers(data) {
                var myIcon = L.icon({
                    iconUrl: './MapCode/icon.png',
                    iconSize: [10, 10],
                });
        
                var textlist = [];
                var coorlist = [];
                var markerlist = [];
                var searchlist = [];
        
                //Creating the strings for the markers and lists
                for (let i = 0; i < data.length; i++) {
                    filepath = `./images/${data[i]['Marker Photo']}`;
                    popuptext = `<img src="${filepath}" alt="Image" class="popup_image">`;
                    if (data[i]['Marker Photo_Military'] !== '') {
                        militaryFilepath = `./images/${data[i]['Marker Photo_Military']}`;
                        popuptext += `<img src="${militaryFilepath}" alt="Image" class="popup_image">`;
                    }
                    popuptext += `<br>${data[i]['Last Name']}, ${data[i]['First Name']}<br>`;
                    if (data[i]['Maiden Name'] !== '') {
                        popuptext += `Maiden Name: ${data[i]['Maiden Name']}<br>`;
                    }
                    popuptext += `${data[i]['Date of Birth']} &ndash; ${data[i]['Date of Death']}`;
                    textlist.push(popuptext);
                    coorlist.push([data[i]['GPS 1'], data[i]['GPS 2']]);
        
                    searchtext = `${data[i]['Last Name']}, ${data[i]['First Name']} 
                                    <br> ${data[i]['Date of Birth']} &ndash; ${data[i]['Date of Death']}`
                    searchlist.push(searchtext);
                }
                
                //assigning the values to the markers
                for (let i = 0; i < coorlist.length-1; i++) {
                    markerlist.push(L.marker(coorlist[i], {icon: myIcon, draggable: false}));
                    markerlist[i].bindPopup(textlist[i], {maxWidth : 600}).openPopup().addTo(markersLayer);
                }
        
                //Code to let us align the markers with the actual graves
                /*markerlist.forEach(function(marker) {
                    marker.on('dragend', function() {
                        console.log(marker.getLatLng().toString());
                    });
                });*/
        
                //Making the list
                for (let i = 0; i < searchlist.length-1; i++) {
                    const li = document.createElement('li');
                    li.innerHTML = searchlist[i];
                    li.classList.add("listclassformat");
                    li.style.backgroundImage =  'url("./lowqualityimages/' + data[i]['Marker Photo'].slice(0, -3) + 'jpg")'; 
                    li.style.backgroundSize = "120px";
                    li.addEventListener('click', function() {
                        map.setView(coorlist[i], 20);
                        markerlist[i].openPopup();
                    });
                    listItems.appendChild(li);
                }
        
            }
        
            document.addEventListener('DOMContentLoaded', function () {
                
                fetch('./MapCode/CemeteryList.csv')//Getting csv values
                    .then(response => response.text())
                    .then(contents => {
                        //Parse it into an array
                        csvLines = Papa.parse(contents, {
                                header: true
                        }).data;
                        markersLayer = new L.LayerGroup().addTo(map);
                        addMarkers(csvLines);
                        document.getElementById('searchInput').addEventListener('input', function () {
                            var searchTerm = this.value.toLowerCase();
                            markersLayer.clearLayers(); // Clear existing markers
                            listItems.innerHTML = ''; //Clear out the search bar
                            data = csvLines;
                            var filteredMarkers = csvLines.filter(function (data) {
                                var firstName = (data['First Name'] || '').toLowerCase();
                                var lastName = (data['Last Name'] || '').toLowerCase();
                        
                                return firstName.includes(searchTerm) || lastName.includes(searchTerm);
                            });
                
                            addMarkers(filteredMarkers);
                        });

                    });
            
                
                
        
                
        
            });
        
        
        
            
            
        
            
            //google satellite
            googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                maxZoom: 22, 
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            });
            googleSat.addTo(map);


