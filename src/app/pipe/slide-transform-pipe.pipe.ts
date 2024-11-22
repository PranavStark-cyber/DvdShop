import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slideTransformPipe',
  standalone: true
})
export class SlideTransformPipe implements PipeTransform {
  transform(
    currentIndex: number,
    cardWidth: number,
    direction: 'left' | 'right',
    totalCards: number,
    visibleCards: number
  ): string {
    let newIndex = currentIndex;

    if (direction === 'right' && currentIndex < totalCards - visibleCards) {
      newIndex++;
    } else if (direction === 'left' && currentIndex > 0) {
      newIndex--;
    }

    const transformValue = -newIndex * cardWidth;
    return `translateX(${transformValue}px)`;
  }
}