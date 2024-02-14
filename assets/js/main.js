const Maj = {

    init: function () {

        const letterCarousel = {

            render: function () {
  
                const rootNode = document.querySelectorAll(".letter-carousel");
                
                if (rootNode) {
                  
                    const viewportNode = document.querySelector(".letter-carousel .embla__viewport");
                    const prevBtn = document.querySelector(".letter_buttons .embla__prev");
                    const nextBtn = document.querySelector(".letter_buttons .embla__next");
                    const dotsNode = document.querySelector('.letter_dots');
                    const emblaApi = EmblaCarousel(viewportNode);

                    const totalSlides = emblaApi.slideNodes().length;
                    const slideCounter = document.getElementById('slideCounter');
                    updateSlideCounter();

                    function updateSlideCounter() {
                        const currentIndex = emblaApi.selectedScrollSnap();
                        const currentSlideNumber = currentIndex + 1;
                        slideCounter.textContent = `${currentSlideNumber} / ${totalSlides}`;
                    }
  
  
                    const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
                      const togglePrevNextBtnsState = () => {
                        if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled')
                        else prevBtn.setAttribute('disabled', 'disabled')
                    
                        if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled')
                        else nextBtn.setAttribute('disabled', 'disabled')
                      }
                    
                      emblaApi
                        .on('select', togglePrevNextBtnsState)
                        .on('init', togglePrevNextBtnsState)
                        .on('reInit', togglePrevNextBtnsState)
                    
                      return () => {
                        prevBtn.removeAttribute('disabled')
                        nextBtn.removeAttribute('disabled')
                      }
                    }
                    
                    const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
                      const scrollPrev = () => emblaApi.scrollPrev()
                      const scrollNext = () => emblaApi.scrollNext()
                      prevBtn.addEventListener('click', scrollPrev, false)
                      nextBtn.addEventListener('click', scrollNext, false)
                    
                      const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
                        emblaApi,
                        prevBtn,
                        nextBtn
                      )
                    
                      return () => {
                        removeTogglePrevNextBtnsActive()
                        prevBtn.removeEventListener('click', scrollPrev, false)
                        nextBtn.removeEventListener('click', scrollNext, false)
                      }
                    }
                  
                  const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
                    emblaApi,
                    prevBtn,
                    nextBtn
                  )
                    
                  emblaApi
                    .on('destroy', removePrevNextBtnsClickHandlers)
                    .on('select', updateSlideCounter)
                      

                }
            }
        };

        letterCarousel.render();
    },
}

window.addEventListener("load", (event) => {
    Maj.init();
});