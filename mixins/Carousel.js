/**
 * Carousel
 */
import smoothscroll from 'smoothscroll-polyfill';

export default {
  data () {
    return {
      elementWidth: 0,
      carouselWidth: 0,
      visibleWidth: 0,
      maximumPosition: 0,
      unusableVisibleWidth: 0,
      disableLeftButton: true,
      disableRightButton: false,
    };
  },

  mounted () {
    smoothscroll.polyfill();
    window.addEventListener('resize', this.resizeEvent);
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resizeEvent);
  },

  methods: {
    calculateState (numberOfItems) {
      let unusableVisibleWidth = 72;
      const elementWidth = this.$refs.carouselElement.firstChild.getBoundingClientRect().width;
      const carouselWidth = numberOfItems * elementWidth;
      const maximumPosition = this.$refs.carouselElement.scrollWidth;

      if (window.innerWidth >= 1200) {
        unusableVisibleWidth = 92;
      }

      const visibleWidth = this.$refs.carouselElement.offsetWidth - unusableVisibleWidth;

      this.unusableVisibleWidth = unusableVisibleWidth;
      this.elementWidth = elementWidth;
      this.carouselWidth = carouselWidth;
      this.visibleWidth = visibleWidth;
      this.maximumPosition = maximumPosition;
      this.disableLeftButton = !this.$refs.carouselElement.scrollLeft;
      this.disableRightButton = visibleWidth >= carouselWidth;
    },

    moveTo (width) {
      this.$refs.carouselElement.scrollTo({
        left: width,
        behavior: 'smooth',
      });
    },

    moveToClickEvent (direction) {
      const invisible = this.$refs.carouselElement.scrollLeft + (direction === 'left' ? -this.visibleWidth + 1 : this.visibleWidth);
      const remainder = invisible - invisible % this.elementWidth;

      this.moveTo(remainder);
    },

    scrollEvent () {
      const scrollLeft = this.$refs.carouselElement.scrollLeft;
      const end = this.maximumPosition - this.visibleWidth - this.elementWidth;

      /* eslint-disable-next-line */
      this.disableLeftButton = 3 > scrollLeft;
      this.disableRightButton = scrollLeft > end;
    },
  },
};
