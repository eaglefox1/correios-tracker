function renderLastTrackerItems(items) {

	let template = `
		<table>
			<thead>
				<th>Reference Number</th>
				<th>Status</th>
				<th>Track point</th>
				<th>Next checking</th>
			</thead>
			<tbody>
				{{lines}}
			</tbody>
		</table>
	`;

	const lines = items.map( item => {

		return `<tr>
					<td>${item.referenceNumber}</td>
					<td>${item.lastStatus}</td>
					<td>${item.tracks.length ? item.tracks[0].trackPoint : ''}</td>
                	<td>${formatDate(item.nextCheck)}</td>
				</tr>`

	}).join('');

	if(lines) {
		
		template = template.replace(/{{lines}}/g, lines);
	}
	else {
		template = '<p>You have no item, please click on the button below to configure one.</p>';
	}

  	return template;

}

function loadLastTrackerItems() {
	
	getTrackItems().then( (items) => {

		document.getElementById('trackItems').innerHTML = renderLastTrackerItems(items);
	});
}


document.getElementById('configureItems').addEventListener('click', () => {
	chrome.tabs.create({'url': chrome.extension.getURL('../options.html')});
});

loadLastTrackerItems();
