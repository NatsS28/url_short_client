import React, { useRef, useState } from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import '../Styles/Form.css';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container'
import Typography from "@material-ui/core/Typography";
import  Paper  from '@material-ui/core/Paper';
import  InputBase  from '@material-ui/core/InputBase';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { API_URL } from '../config/config';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import QRCode from "qrcode.react";
import Tooltip from "@material-ui/core/Tooltip";
import CopyToClipboard from "react-copy-to-clipboard";
import { FileCopyOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) =>

    createStyles({
        inputContainer: {
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            padding: theme.spacing(1),
            marginTop: theme.spacing(5),
            [theme.breakpoints.down("sm")]: {
                width: "100%",
            },
        },
        qrcode: {
            width: "100%",
            marginBottom: theme.spacing(2),
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(3),
        },
        copyIcon: {
            color: theme.palette.grey[500],
            marginLeft: theme.spacing(4),
            [theme.breakpoints.down("xs")]: {
                marginLeft: theme.spacing(0),
            },
        },
        shortUrlContainer: {
            alignItems: 'center',
            cursor: "pointer",
            display: "inline-block",
            "&:hover": {
                "& svg": {
                    color: theme.palette.secondary["main"],
                },
            },
            maxWidth: "100%",
            padding: theme.spacing(2),
            marginTop: theme.spacing(2),
        },
        shortUrlDiv: {
            display: "flex",
        },
        
    })
)
function Form() {

    const classes = useStyles();
    const sourceUrl = window.location.origin;
    const [isOpen, setIsOpen] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [isTitleVisible, setIsTitleVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const textRef = useRef(null);
    const [snackbar, setSnackbar] = useState({
        isOpen: false,
        message:'',
    })

    const matches = useMediaQuery("(max-width:600px)");
    const handleClose = () => {
        setSnackbar({
            isOpen: false,
            message:"",
        })
    }

    const handleFocus = () => {
        if (matches) {
            setIsTitleVisible(false);
        }
    }

    const handleOnBlur = () => {
        setIsTitleVisible(true);
    }

    const handleClick = () => {
        setSnackbar({
            isOpen: true,
            message:"copied to clipboard"
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const textInput = textRef.current?.value;
        console.log(textRef);
        console.log(textInput);
        const timer = setTimeout(() => {
            setLoading(true);
        }, 1000);
        
        const response = await axios.post(`${API_URL}`, { url: textInput });
        console.log(response);
        clearTimeout(timer);
        setLoading(false);
        setShortUrl(`${sourceUrl}/${response.data.url.short}`);
        setIsTitleVisible(true);
    }
  return (
      <div className='root'>
          <Snackbar
              anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
              }}
              open={snackbar.isOpen}
              autoHideDuration={6000}
              onClose={handleClose}
              message={snackbar.message}
              action={
                  <>
                      <IconButton
                          size="small"
                          aria-label="close"
                          color="inherit"
                          onClick={handleClose}
                      >
                          <CloseIcon fontSize="small" />
                      </IconButton>
                  </>
              }
          />
          <Navbar />
          <Container className='root_form'>
              {isTitleVisible ? <Typography
                  variant="h3"
                  gutterBottom
                  align="center"
                  className="title"
              >
                  Shorts - URL Shortening Service
              </Typography> : null}

              <Paper
                  component="form"
                  className={classes.inputContainer}
                  onFocus={handleFocus}
                  onBlur={handleOnBlur}
                  onSubmit={handleSubmit}
              >
                  <InputBase
                      className='input'
                      placeholder='Enter long URL'
                      type='url'
                      required
                      inputRef={textRef}
                      
                  />

                  <Button color='secondary' type='submit'>
                      Generate
                  </Button>
                 
                  
              </Paper>
              <br></br>
              <br></br>
             
              {loading ? <CircularProgress color="secondary" /> : null}
              
              {shortUrl ?
                  <div>
                      <QRCode value={shortUrl} className={classes.qrcode} />
                      <CopyToClipboard text={shortUrl} onCopy={handleClick}>
                          <Tooltip title="Click to copy">
                              <Paper className={classes.shortUrlContainer}>
                                  <div className={classes.shortUrlDiv}>
                                      <Typography>{shortUrl}</Typography>
                                      <FileCopyOutlined className={classes.copyIcon}></FileCopyOutlined>
                                  </div>
                              </Paper>
                          </Tooltip>
                      </CopyToClipboard>
                  </div>
                  
                  :null

              }

          </Container>

          
    </div>
  )
}

export default Form