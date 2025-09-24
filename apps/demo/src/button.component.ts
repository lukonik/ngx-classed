import { booleanAttribute, Component, input } from '@angular/core';
import { classed } from 'ngx-classed';

export type VARIANT_TYPES = 'default' | 'secondary';
// | 'destructive'
// | 'outline'
// | 'ghost'
// | 'link'
// | 'icon'
// | 'with-icon'
// | 'loading';

export type SIZE_TYPES = 'sm' | 'md' | 'lg' | 'xl';

const HOST_CLASSES = classed({
  base: `  inline-flex items-center justify-center gap-1.5
   bg-transparent text-base font-semibold
   rounded-md border border-solid
   relative cursor-pointer
   transition-colors duration-200`,
  variants: {
    variant: {
      default: 'bg-blue-600',
      secondary: 'bg-red-600',
    },
    loading: {
      true: 'opacity-70 cursor-not-allowed',
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'secondary',
        loading: true,
      },
      classes: 'text-9xl',
    },
  ],
  // compoundVariants: [
  //   {
  //     variants: {
  //       variant: 'default',
  //       loading: true,
  //     },
  //     classes: [],
  //   },
  // ],
});

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ButtonComponent {
  icon = input(false, { transform: booleanAttribute });
  size = input<SIZE_TYPES>('md');
  variant = input<VARIANT_TYPES>('default');
  loading = input(false, { transform: booleanAttribute });

  hostClasses = HOST_CLASSES(() => ({
    variant: this.variant(),
    size: this.size(),
    icon: this.icon(),
    loading: this.loading(),
  }));

  // (() => ({
  //   variant: this.variant(),
  //   size: this.size(),
  //   icon: this.icon(),
  //   loading: this.loading(),
  // }));

  hostClass = classed({
    base: ``,
    variants: {
      variant: {},
    },
  });

  // hostClasses = classed(`
  //    inline-flex items-center justify-center gap-1.5
  //  bg-transparent text-base font-semibold
  //  rounded-md border border-solid
  //  relative cursor-pointer
  //  transition-colors duration-200
  // `)
  //   .var()
  //   .multiVar(
  //     [
  //       {
  //         variants: {
  //           size: 'sm',
  //           icon: false,
  //         },
  //         classes: 'h-8 px-3 text-sm',
  //       },
  //       {
  //         variants: {
  //           size: 'md',
  //           icon: false,
  //         },
  //         classes: 'h-9 px-4 text-sm',
  //       },
  //       {
  //         variants: {
  //           size: 'lg',
  //           icon: false,
  //         },
  //         classes: 'h-10 px-8',
  //       },
  //       {
  //         variants: {
  //           size: 'xl',
  //           icon: false,
  //         },
  //         classes: 'h-12 px-10 text-lg',
  //       },

  //       {
  //         variants: {
  //           size: 'sm',
  //           icon: true,
  //         },
  //         classes: 'h-8 w-8',
  //       },
  //       {
  //         variants: {
  //           size: 'md',
  //           icon: true,
  //         },
  //         classes: 'h-9 w-9',
  //       },

  //       {
  //         variants: {
  //           size: 'lg',
  //           icon: true,
  //         },
  //         classes: 'h-10 w-10',
  //       },
  //       {
  //         variants: {
  //           size: 'xl',
  //           icon: true,
  //         },
  //         classes: 'h-12 w-12',
  //       },
  //     ],
  //     () => ({ size: this.size(), icon: this.icon() })
  //   )
  //   .toSignal();
}
