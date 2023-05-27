let currentPosition = 0;
function scrollItems(direction, categroy) {
console.log("scroll "+direction);
const carousel = document.querySelector('.carousel.'+categroy);
const itemList = document.querySelector('.card-list.'+categroy);
const items = document.querySelectorAll('.item.'+categroy);
console.log(items);
console.log(itemList);
console.log(carousel);
const itemWidth = items[0].offsetWidth;
const containerWidth = carousel.offsetWidth;
const visibleItems = Math.floor(containerWidth / itemWidth);
const scrollAmount = direction === 'prev' ? itemWidth * visibleItems : -itemWidth * visibleItems;
currentPosition += scrollAmount;
currentPosition = Math.max(currentPosition, 0);
currentPosition = Math.min(currentPosition, itemWidth * (items.length - visibleItems));
itemList.style.transform = `translateX(-${currentPosition}px)`;
}