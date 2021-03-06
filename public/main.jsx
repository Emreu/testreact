var GraphViewer = React.createClass({
    getInitialState: function() {
        return {
            points: []
        }  
    },
    componentWillMount: function() {
        this.reload()
    },
    reload: function() {
        $.getJSON( this.props.dataurl, (function(data){
            this.setState({points: data.points})
        }).bind(this))
        
    },
    render: function() {
        return (
            <div className="graph">
                <svg
                    width={ this.props.width}
                    height={ this.props.height}>
                    <GraphLine points={ this.state.points } scale={50} shift={100} step={20}/>
                </svg>
                <br/>
                <button type="button" onClick={ this.reload }>Refresh</button>
            </div>
        )
    }
})

function GraphLine(props) {
    var d = props.points.map(function(point, index) {
        return ((index === 0) ? "M" : "L") + props.step*index + "," + (props.shift + props.scale*point)
    }).join(" ")
    return (
        <path d={d} stroke="black" strokeWidth="2" fill="none"/>
    )
}

ReactDOM.render(
    <GraphViewer dataurl="data" width="600" height="300"/>,
    document.getElementById("container")
)