import React, {useState} from "react";
import Carousel, {Modal, ModalGateway} from "react-images";
import {Button} from "@material-ui/core";

export const ImageViewer = ({source, record = {}}) => {
    // console.log(record.batch.images);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    if(record.batch.images){
        record.batch.images.map(img => (
            img.source = img.url
        ))
    }

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    return (
        <React.Fragment>
            <ModalGateway>
                {modalIsOpen ? (
                    <Modal onClose={toggleModal}>
                        <Carousel
                            currentIndex={selectedIndex}
                            views={record.batch.images}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>

            <Gallery>
                {
                    record.batch.images.map((img, j) => (
                        <Image onClick={() => {setSelectedIndex(j);toggleModal()}} key={img.url}>
                            <img
                                src={img.url}
                                style={{
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    maxWidth: '100%',
                                }}
                            />
                        </Image>
                    ))
                }
            </Gallery>
        </React.Fragment>
    )
};


const gutter = 2;

const Gallery = (props) => (
    <div
        style={{
            overflow: 'hidden',
            marginLeft: -gutter,
            marginRight: -gutter,
        }}
        {...props}
    />
);

const Image = (props) => (
    <div
        style={{
            backgroundColor: '#eee',
            boxSizing: 'border-box',
            float: 'left',
            margin: gutter,
            overflow: 'hidden',
            paddingBottom: '16%',
            position: 'relative',
            width: `calc(25% - ${gutter * 2}px)`,

            ':hover': {
                opacity: 0.9,
            },
        }}
        {...props}
    />
);
