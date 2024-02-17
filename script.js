const navTabs = document.querySelector('nav.tabs')
const navTabsItems = navTabs.querySelectorAll('a')
const navTabsFirstItem = [...navTabsItems].at(0)
const navTabsLastItem = [...navTabsItems].at(-1)

// store max overall width of items plus min width of an item
const itemsWidth = Math.ceil(navTabsLastItem.getBoundingClientRect().right - navTabsFirstItem.getBoundingClientRect().left)
navTabs.setAttribute('data-items-width', itemsWidth)
const itemMinWidth = navTabsLastItem.clientHeight

// store max width of each item
navTabsItems.forEach(item => {
	// console.log(item)
	item.setAttribute('data-max-width', item.clientWidth)
})

// check initial width and apply compact class if required
if (navTabsLastItem.getBoundingClientRect().right >= navTabs.getBoundingClientRect().right) {
	navTabs.classList.add('compact')
}



// resize compact check
const navTabsObserver = new ResizeObserver(
	(entries, observer) => {
		entries.forEach(entry => {
			if (entry.target.classList.contains('compact') && entry.contentBoxSize[0].inlineSize >= entry.target.dataset.itemsWidth) {
				entry.target.classList.remove('compact')
			} else if (!entry.target.classList.contains('compact') && entry.contentBoxSize[0].inlineSize < entry.target.dataset.itemsWidth) {
				entry.target.classList.add('compact')
			}
	})
})

navTabsObserver.observe(navTabs)



// active tab change

function maxWidth(width) {
	return 'max-width: ' + width  + 'px'
}

navTabs.addEventListener('click', (e) => {
	const changeTo = e.target
	if (changeTo.tagName == 'A') {
		const changeFrom = changeTo.parentNode.querySelector('.active')
		
		if (navTabs.classList.contains('compact')) {
			// compact
			const changeTime = parseFloat(getComputedStyle(changeTo).transitionDuration).toFixed(3)
			const changeFromMaxWidth = changeFrom.dataset.maxWidth
			const changeToMaxWidth = changeTo.dataset.maxWidth
			
			changeTo.setAttribute('style',maxWidth(itemMinWidth) )
			changeTo.classList.add('active', 'transition');
			changeFrom.setAttribute('style',maxWidth(changeFromMaxWidth) )
			changeFrom.classList.remove('active');
			changeFrom.classList.add('transition');

			changeTo.offsetWidth
			changeFrom.offsetWidth
			// forces browser to recognise change with regard to transitions

			changeTo.setAttribute('style',maxWidth(changeToMaxWidth) )
			changeFrom.setAttribute('style',maxWidth(itemMinWidth) )

			setTimeout(() => { 
				changeTo.classList.remove('transition');
				changeTo.setAttribute('style','')
				changeFrom.classList.remove('transition');
				changeFrom.setAttribute('style','')
			}, changeTime * 1000);
			
		} else {
			// default
			changeFrom.classList.remove('active')
			changeTo.classList.add('active')
		}
		
	}
})



// theme control

document.getElementById('theme').addEventListener('change', (e) => {
	document.querySelector('[data-theme]').setAttribute('data-theme', e.target.value)
});

// width control

document.getElementById('width').addEventListener('change', (e) => {
	document.querySelector('[data-width]').setAttribute('data-width', e.target.value)
});