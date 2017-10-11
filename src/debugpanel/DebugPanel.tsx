///<reference path='../interfaces/interfaces.d.ts' />

import * as React from 'react';

export class DebugPanel extends React.Component<IDebugPanelProps, {}> {
    constructor(props: IDebugPanelProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <div>
                    <span>x: {this.props.x}, y: {this.props.y}</span>
                </div>
                <span>Speed X: {this.props.speedX}, Speed Y: {this.props.speedY}</span>
                <div>
                    canvas width: {this.props.rectWidth}, length: {this.props.rectLength}
                </div>
                <div>
                    <span>click x: {this.props.clickX}, click y: {this.props.clickY}, distanceToClick: {this.props.distanceToClick}</span>
                </div>
            </div>
        );
    }
}