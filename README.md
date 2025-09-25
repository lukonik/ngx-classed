![NPM Version](https://img.shields.io/npm/v/ngx-classed)

# NgxClassed ✨

`ngx-classed` library allows you to dynamically add or remove classes based on state. It especially perfectly suits frameworks like Tailwind where you have utility classes and need to apply them based on some states.

✨ **Key Features:**

- 🔒 **Type-safe**: Full TypeScript support with intelligent autocomplete
- ⚡ **Angular Signals**: Built on Angular's reactive computed signals
- 🎨 **Variant-based**: Define multiple styling variants with ease
- 🧩 **Compound Variants**: Handle complex styling combinations
- 📦 **Zero Dependencies**: Lightweight with no external dependencies

## Installation

```bash
npm install ngx-classed
```

## TailwindCSS IntelliSense Support (Optional)

If you use TailwindCSS, you can enable IntelliSense for better developer experience:

### VSCode

Add this configuration to your `.vscode/settings.json`:

```json
{
  "tailwindCSS.experimental.classRegex": [["classed(?:<[^>]+>)?\\(([^)]*)\\)", "[\"'`]([^\"'`]*)[\"'`]"]]
}
```

### WebStorm

_Available for WebStorm 2023.1 and later_

1. Open Settings → Languages and Frameworks → Style Sheets → Tailwind CSS
2. Add the following to your Tailwind configuration:

```json
{
  "classFunctions": ["classed", "cx"]
}
```

## Examples

### Basic Button Component

```typescript
import { Component, Input } from '@angular/core';
import { classed } from 'ngx-classed';

@Component({
  selector: 'app-button',
  template: `<button [class]="buttonClass()"><ng-content></ng-content></button>`,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  private buttonClassed = classed({
    base: 'font-medium rounded-lg transition-colors',
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
  });

  buttonClass = this.buttonClassed(() => ({
    variant: this.variant,
    size: this.size,
  }));
}
```

### Card Component with Compound Variants

```typescript
import { Component, Input } from '@angular/core';
import { classed } from 'ngx-classed';

@Component({
  selector: 'app-card',
  template: `
    <div [class]="cardClass()">
      <h3 [class]="titleClass()">{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  `,
})
export class CardComponent {
  @Input() title = '';
  @Input() content = '';
  @Input() variant: 'default' | 'primary' | 'danger' = 'default';
  @Input() elevated = false;
  @Input() interactive = false;

  private cardClassed = classed({
    base: 'rounded-lg p-6 border transition-all',
    variants: {
      variant: {
        default: 'bg-white border-gray-200',
        primary: 'bg-blue-50 border-blue-200',
        danger: 'bg-red-50 border-red-200',
      },
      elevated: {
        true: 'shadow-lg',
        false: 'shadow-sm',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-xl',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        interactive: true,
        className: 'hover:bg-blue-100',
      },
      {
        variant: 'danger',
        elevated: true,
        className: 'shadow-red-100',
      },
    ],
  });

  private titleClassed = classed({
    base: 'text-xl font-semibold mb-2',
    variants: {
      variant: {
        default: 'text-gray-900',
        primary: 'text-blue-900',
        danger: 'text-red-900',
      },
    },
  });

  cardClass = this.cardClassed(() => ({
    variant: this.variant,
    elevated: this.elevated,
    interactive: this.interactive,
  }));

  titleClass = this.titleClassed(() => ({
    variant: this.variant,
  }));
}
```

### Alert Component with Multiple States

```typescript
import { Component, Input } from '@angular/core';
import { classed } from 'ngx-classed';

@Component({
  selector: 'app-alert',
  template: `
    <div [class]="alertClass()">
      <div [class]="iconClass()">{{ icon }}</div>
      <div>
        <h4 [class]="titleClass()">{{ title }}</h4>
        <p [class]="messageClass()">{{ message }}</p>
      </div>
    </div>
  `,
})
export class AlertComponent {
  @Input() type: 'success' | 'warning' | 'error' | 'info' = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = false;

  get icon() {
    const icons = {
      success: '✅',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️',
    };
    return icons[this.type];
  }

  private alertClassed = classed({
    base: 'p-4 rounded-md border-l-4 flex gap-3',
    variants: {
      type: {
        success: 'bg-green-50 border-green-400',
        warning: 'bg-yellow-50 border-yellow-400',
        error: 'bg-red-50 border-red-400',
        info: 'bg-blue-50 border-blue-400',
      },
      dismissible: {
        true: 'pr-12 relative',
        false: '',
      },
    },
  });

  private titleClassed = classed({
    base: 'font-medium text-sm',
    variants: {
      type: {
        success: 'text-green-800',
        warning: 'text-yellow-800',
        error: 'text-red-800',
        info: 'text-blue-800',
      },
    },
  });

  private messageClassed = classed({
    base: 'text-sm mt-1',
    variants: {
      type: {
        success: 'text-green-700',
        warning: 'text-yellow-700',
        error: 'text-red-700',
        info: 'text-blue-700',
      },
    },
  });

  private iconClassed = classed({
    base: 'text-lg flex-shrink-0',
  });

  alertClass = this.alertClassed(() => ({
    type: this.type,
    dismissible: this.dismissible,
  }));

  titleClass = this.titleClassed(() => ({ type: this.type }));
  messageClass = this.messageClassed(() => ({ type: this.type }));
  iconClass = this.iconClassed(() => ({}));
}
```

### Reusable Button Styles

```typescript
// shared/button.styles.ts
import { classed } from 'ngx-classed';

export const buttonClassed = classed({
  base: 'inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    variant: {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
      secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    },
    size: {
      xs: 'px-2.5 py-1.5 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-2 text-base',
      xl: 'px-6 py-3 text-base',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      disabled: true,
      className: 'bg-gray-400 hover:bg-gray-400',
    },
  ],
});

// Usage in components
@Component({
  selector: 'save-button',
  template: `<button [class]="buttonClass()" (click)="onSave()">Save</button>`,
})
export class SaveButtonComponent {
  @Input() loading = false;

  buttonClass = buttonClassed(() => ({
    variant: 'primary' as const,
    size: 'md' as const,
    disabled: this.loading,
  }));

  onSave() {
    // Save logic
  }
}
```

## Inspiration

This library draws inspiration from [CVA (Class Variance Authority)](https://cva.style/) 🎨, bringing similar variant-based styling patterns to the Angular ecosystem with full integration into Angular's reactive system.

## License

MIT

---

Built with ❤️ for the Angular community
