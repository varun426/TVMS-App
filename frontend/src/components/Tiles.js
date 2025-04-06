import React from "react";

const content = [
    {
        src: 'https://demos.telerik.com/kendo-ui/content/web/cards/barcelona.jpg',
        text: 'Barcelona',
    },
    {
        src: 'https://demos.telerik.com/kendo-ui/content/web/cards/rome.jpg',
        text: 'Rome',
    },
    {
        src: 'https://demos.telerik.com/kendo-ui/content/web/cards/sanfran.jpg',
        text: 'San Francisco',
    },
];

const Tiles = () => {
    return <div style={{
        paddingTop: "150px",
        maxWidth: 1000,
        marginLeft:"auto", 
        marginRight: "auto"
    }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', padding: '10px', gap: '10px' }}>
            {content.map((item, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <img
                        src={item.src}
                        alt={item.text}
                        style={{ height: 'auto' }}
                    />
                    <span style={{ padding: 10 }}>{item.text}</span>
                    <button type="button" class="btn btn-danger">Check Availability</button>
                </div>
            ))}
        </div>
    </div>;
};

export default Tiles;