import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';

interface DetailCardProps {
  title: string,
  description: string,
  image: string,
  ranking: number,
}

export default function DetailCard({title, description, image, ranking}: DetailCardProps) {
  return (
    <Card sx={{ width: 300, borderRadius: 3}}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          width={300}
          alt="green iguana"
        />
        <CardContent sx={{ padding: '10px 10px 30px' }}>
          <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
            <Typography gutterBottom variant="h5" component="div" sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 1,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical'
            }}>
              {title}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              {ranking}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical'
            }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}