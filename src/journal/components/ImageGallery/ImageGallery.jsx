/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageGallery = ({ images = [] }) => {

    return (
        <>
            <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={164}>
                {images.map((item, index) => (
                    <ImageListItem key={index}>
                        <img
                            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt='Note images'
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}