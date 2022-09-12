// Modified version of solid-fa, since that wasn't working for whatever reason

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { createMemo, mergeProps, Show } from 'solid-js';

interface SolidFaProps {
  icon: IconDefinition;

  size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x' | string;
  color?: string;

  fw?: boolean;
  pull?: 'left' | 'right';

  scale?: number | string;
  translateX?: number | string;
  translateY?: number | string;
  rotate?: number | string;
  flip?: 'horizontal' | 'vertical' | 'both';

  // Duotone Icons
  primaryColor?: string;
  secondaryColor?: string;
  primaryOpacity?: number | string;
  secondaryOpacity?: number | string;
  swapOpacity?: boolean;
}

export default function Fa(props: SolidFaProps) {
  props = mergeProps(
    {
      scale: 1,
      translateX: 0,
      translateY: 0,
      primaryOpacity: 1,
      secondaryOpacity: 0.4,
    },
    props
  );

  const i = createMemo(() => props.icon?.icon || [0, 0, '', [], '']);
  const s = createMemo(() => getStyles(props.size, props.pull, props.fw));
  const transform = createMemo(() => getTransform(props.scale, props.translateX, props.translateY, props.rotate, props.flip, 512));

  return (
    <svg
      classList={{
        fa: true,
      }}
      style={s()}
      viewBox={`0 0 ${i()[0]} ${i()[1]}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`translate(${i()[0] as any / 2} ${i()[1] as any / 2})`} transform-origin={`${i()[0] as any / 4} 0`}>
        <g transform={transform()}>
          <Show
            when={typeof i()[4] === 'string'}
            fallback={
              <>
                <path
                  d={i()[4][0]}
                  fill={props.secondaryColor || props.color || 'currentColor'}
                  fill-opacity={props.swapOpacity != false ? props.primaryOpacity : props.secondaryOpacity}
                  transform={`translate(${i()[0] as any / -2} ${i()[1] as any / -2})`}
                />
                <path
                  d={i()[4][1]}
                  fill={props.primaryColor || props.color || 'currentColor'}
                  fill-opacity={props.swapOpacity != false ? props.secondaryOpacity : props.primaryOpacity}
                  transform={`translate(${i()[0] as any / -2} ${i()[1] as any / -2})`}
                />
              </>
            }
          >
            <path
              d={i()[4] as string}
              fill={props.color || props.primaryColor || 'currentColor'}
              transform={`translate(${i()[0] as any / -2} ${i()[1] as any / -2})`}
            />
          </Show>
        </g>
      </g>
    </svg>
  );
}

const parseNumber = parseFloat;

export function joinCss(obj, separator = ';'): string {
  let texts;
  if (Array.isArray(obj)) {
    texts = obj.filter((text) => text);
  } else {
    texts = [];
    for (const prop in obj) {
      if (obj[prop]) {
        texts.push(`${prop}:${obj[prop]}`);
      }
    }
  }
  return texts.join(separator);
}

export function getStyles(size?, pull?, fw?): { [k: string]: any } {
  let float;
  let width;
  const height = '1em';
  let lineHeight;
  let fontSize;
  let textAlign;
  let verticalAlign = '-.125em';
  const overflow = 'visible';

  if (fw) {
    textAlign = 'center';
    width = '1.25em';
  }

  if (pull) {
    float = pull;
  }

  if (size) {
    if (size === 'lg') {
      fontSize = '1.33333em';
      lineHeight = '.75em';
      verticalAlign = '-.225em';
    } else if (size === 'xs') {
      fontSize = '.75em';
    } else if (size === 'sm') {
      fontSize = '.875em';
    } else {
      fontSize = size.replace('x', 'em');
    }
  }

  return {
    float,
    width,
    height,
    'line-height': lineHeight,
    'font-size': fontSize,
    'text-align': textAlign,
    'vertical-align': verticalAlign,
    'transform-origin': 'center',
    overflow,
  };
}

export function getTransform(
  scale,
  translateX,
  translateY,
  rotate?,
  flip?,
  translateTimes = 1,
  translateUnit = '',
  rotateUnit = ''
): string {
  let flipX = 1;
  let flipY = 1;

  if (flip) {
    if (flip === 'horizontal') {
      flipX = -1;
    } else if (flip === 'vertical') {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }

  return joinCss(
    [
      `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
      `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
      rotate && `rotate(${rotate}${rotateUnit})`,
    ],
    ' '
  );
}
