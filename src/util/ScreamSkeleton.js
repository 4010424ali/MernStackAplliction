import React, { Fragment } from 'react';
import NoImg from '../image/no-image.jpeg';

// Material UI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  card: {
    display: 'flex'
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover'
  },
  handle: {
    width: 60,
    height: 20,
    backgroundColor: '#00bcd4',
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0, 0 ,0, 0.3)',
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: '90%',
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  haflLine: {
    height: 15,
    width: '50%',
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }
});

const ScreamSkeleton = props => {
  const classes = useStyle();

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index} style={{ marginBotton: '1rem' }}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.haflLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

export default ScreamSkeleton;
