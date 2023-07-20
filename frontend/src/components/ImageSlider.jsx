import { Box, Button, Fab } from '@mui/material';
import React, { useRef } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import LeftIcon from '@mui/icons-material/ChevronLeftOutlined';
import RightIcon from '@mui/icons-material/ChevronRightOutlined';

export default function Example() {
	const slideRef = useRef(null);
	return (
		<>
			<Slide
				ref={slideRef}
				autoplay={false}
				prevArrow={<></>}
				nextArrow={<></>}
				transitionDuration={300}
			>
				{slideImages.map((slideImage, index) => (
					<Box
						key={index}
						component="img"
						sx={{
							height: '100%',
							width: '100%',
							borderRadius: 1,
						}}
						alt="The house from the offer."
						src={slideImage.url}
					/>
				))}
			</Slide>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					margin: '10px 0',
				}}
			>
				<Button
					size="small"
					onClick={() => slideRef.current.goBack()}
					sx={{ borderRadius: 70 }}
				>
					<LeftIcon color="secondary" />
				</Button>
				<Button
					size="small"
					onClick={() => slideRef.current.goNext()}
					sx={{ borderRadius: 70 }}
				>
					<RightIcon color="secondary" />
				</Button>
			</Box>
		</>
	);
}

const slideImages = [
	{
		url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
		caption: 'Slide 1',
	},
	{
		url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
		caption: 'Slide 2',
	},
	{
		url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
		caption: 'Slide 3',
	},
];
