import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
const axios = require('axios').default;

function DashboardViewDetail() {
  return (
    <Card sx={{ minWidth: 275 }}>
        <CardHeader>
            <Typography variant="h5" component="div">
            Dashboard # {$route.params.id }
            </Typography>
        </CardHeader>
        <CardContent>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </Card>

  )
}


export default DashboardViewDetail;