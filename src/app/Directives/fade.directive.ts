import { Directive, ElementRef, HostListener } from '@angular/core';
//import { Renderer } from "@angular/core";
import { Renderer2 } from "@angular/core";

@Directive({
  selector: '[appFade]'
})
export class FadeDirective {

  // // in Renderer
  // renderer.setElementStyle(el: any, style: string, value?: any)
  // // in Renderer2	
  // abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void
  
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // renderer.setElementStyle(el.nativeElement, 'opacity', '.6')    
    // renderer.setElementStyle(el.nativeElement, 'transition', '.4s opacity')
    renderer.setStyle(el.nativeElement, 'opacity', '.6');
    renderer.setStyle(el.nativeElement, 'transition', '.4s opacity')
  }
  
  @HostListener('mouseover') mouseover() {
    // this.renderer.setElementStyle(this.el.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
  }
  
  @HostListener('mouseout') mouseout() {
    // this.renderer.setElementStyle(this.el.nativeElement, 'opacity', '.6');
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '.6');
  }

  // Old Constructor
  // constructor(private el: ElementRef, private renderer: Renderer) {
  //   el.nativeElement.style.opacity = '.6'
  //   el.nativeElement.style.transition = '.4s opacity'
  // }
  
}
