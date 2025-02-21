import React from 'react';

import {
    BaseColors,
    borderRadius,
    classNames,
    defaultColors,
    defaultValueFormatter,
    fontSize,
    getColorTheme,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    sizing,
    spacing
} from 'lib';
import { Color, MarginTop, ValueFormatter } from '../../../lib';

type BarListData = {
    name: string,
    value: number,
}

const getWidthsFromValues = (data: BarListData[]) => {
    let maxValue = -Infinity;
    data.forEach(item => {
        maxValue = Math.max(maxValue, item.value);
    });

    return data.map(item => {
        if (item.value === 0) return 0;
        return Math.max((item.value / maxValue) * 100, 1);
    });
};

export interface BarListProps {
    data: BarListData[],
    valueFormatter?: ValueFormatter,
    color?: Color,
    showAnimation?: boolean,
    marginTop?: MarginTop,
}

const BarList = ({
    data = [],
    color = BaseColors.Blue,
    valueFormatter = defaultValueFormatter,
    showAnimation = true,
    marginTop = 'mt-0',
}: BarListProps) => {
    const widths = getWidthsFromValues(data);

    const rowHeight = sizing.threeXl.height;

    return (
        <div className={ classNames(
            'tr-flex tr-justify-between',
            parseMarginTop(marginTop),
            spacing.threeXl.spaceX,
        ) }>
            <div className="tr-relative tr-w-full">
                { data.map((item, idx) => (
                    <div
                        key={ item.value }
                        className={ classNames(
                            'tr-flex tr-items-center',
                            rowHeight,
                            getColorVariantsFromColorThemeValue(getColorTheme(color).lightBackground).bgColor,
                            borderRadius.sm.all,
                            idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
                        ) }
                        style={ { 'width': `${widths[idx]}%`, 'transition': showAnimation ? 'all 2s' : '' } }
                    >
                        <p className={ classNames(
                            'tr-absolute tr-max-w-full tr-whitespace-nowrap tr-truncate',
                            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                            spacing.sm.left,
                            fontSize.sm,
                        ) }>
                            { item.name }
                        </p>
                    </div>
                )) }
            </div>
            <div className="tr-text-right tr-min-w-min">
                { data.map((item, idx) => (
                    <div
                        key={ item.value }
                        className={ classNames(
                            'tr-flex tr-justify-end tr-items-center',
                            rowHeight,
                            idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
                        ) }
                    >
                        <p className={ classNames(
                            'tr-whitespace-nowrap tr-truncate',
                            getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
                            fontSize.sm,
                        ) }>
                            { valueFormatter(item.value) }
                        </p>
                    </div>
                )) }
            </div>
        </div>
    );
};

export default BarList;
