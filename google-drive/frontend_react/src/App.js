import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Grid, Card, CardActions, CardContent, Button, Stack, Typography } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import DashboardView from './components/DashboardView';
import FileManager from './components/listers/FileTable';
import FileDetail from './components/listers/FileDetail';
import IndexManager from './components/listers/IndexCards';
import Setting from './components/Setting';
// import IndexManager from './components/listers/FileVue';
import Video from './components/Video';
import NoMatch from './components/NoMatch';
import LeftMenu from './components/LeftMenu';
import TopMenu from './components/TopMenu';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuFlag: false,
			useComponent: "",
			drawer: true,
			components: [],
			sideBar: true,
        	urlPath: "null",
			propObj:{
				editMode:true
			},
		}
		
	}
	componentDidMount () {
		let path = document.location.href.split("#/")
		this.setState({...this.state, urlPath:path[0]});
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick = () => {
		this.setState({
			menuFlag: !this.state.menuFlag,
		})
	}
	handleProps = (name, value) => {
		console.log("handleProps", name, value)
		this.setState({ ...this.state,
			[name]: value,
		})
	}
	changeUrl = (url) => {
		let path = document.location.href.split("#/")
		console.log(url);
		this.setState({...this.state, urlPath:path[1]});
	}
  render() {

	  return(
	<>
		<TopMenu handleClick={this.handleClick} urlPath={this.state.urlPath} handleProps={this.handleProps}/>
		<Grid container style={{maxWidth:"100%", width:'100%'}}>
			{/* <Grid item xs="2"> */}
			<Grid item lg={1}>
				<LeftMenu menuFlag={this.state.menuFlag} handleClick={this.handleClick}
							changeUrl={this.changeUrl}/>
			</Grid>
			{/* <Grid item xs="auto" > */}
			<Grid item lg={8}>
				{this.state.urlPath?
				<Routes>
					<Route path="/" element={<DashboardView />} />
					<Route path="/files" element={<FileManager />} />
					<Route path="/files/:id" element={<FileDetail />} />
					<Route path="/indices" element={<IndexManager />} />
					<Route path="/indices/:id" element={<IndexManager />} />
					<Route path="/video" element={<Video />} />
					<Route path="/setting" element={<Setting change={this.handleProps} propObj={this.state.propObj}/>} />
					<Route path="*" element={<NoMatch />} />
				</Routes>
					:
				(
					<Stack
						justifyContent="center"
						direction={{ xs: 'column', sm: 'row' }}
						spacing={{ xs: 1, sm: 2, md: 4 }}
					>
						<Card
							style={{maxWidth:"100%", minWidth:'300px',height:'300px', margin:'20px', textAlign:"center"}}
							variant="outlined"
							>
							<CardContent sx={{textAlign:"center", mt:'80px'}}>
								<ul style={{margin: 0, padding: 0, listStyle: 'none' }}>
									<Typography
										component="li"
										// variant="subtitle1"
										align="center"
									>
										<AppsIcon sx={{ fontSize: '60px', color: 'rgb(149, 117, 205)' }}/>
									</Typography>
								</ul>
							</CardContent>
						<CardActions>
							<Button fullWidth={true} color="secondary" variant="outlined"
									onClick={this.changeUrl} component={Link} to={"/"}>
							Dashboard
							</Button>
						</CardActions>
						</Card>
						<Card
							style={{maxWidth:"100%", minWidth:'300px',height:'300px', margin:'20px'}}
							variant="outlined"
							>
							<CardContent sx={{textAlign:"center", mt:'80px'}}>
								<ul style={{margin: 0, padding: 0, listStyle: 'none' }}>
									<Typography
										component="li"
										// variant="subtitle1"
										align="center"
									>
										<AppsIcon sx={{ fontSize: '60px', color: 'rgb(149, 117, 205)' }}/>
									</Typography>
								</ul>
							</CardContent>
						<CardActions>
							<Button fullWidth={true} color="secondary" variant="outlined"
									onClick={this.changeUrl} component={Link} to={"/files"}>
							File
							</Button>
						</CardActions>
						</Card>
						<Card
							style={{maxWidth:"100%", minWidth:'300px',height:'300px', margin:'20px'}}
							variant="outlined"
						>
							<CardContent sx={{textAlign:"center", mt:'80px'}}>
								<ul style={{margin: 0, padding: 0, listStyle: 'none' }}>
									<Typography
										component="li"
										align="center"
									>
										<AppsIcon sx={{ fontSize: '60px', color: 'rgb(149, 117, 205)' }}/>
									</Typography>
								</ul>
							</CardContent>
							<CardActions>
								<Button fullWidth={true} color="secondary" variant="outlined"
										onClick={this.changeUrl} component={Link} to={"/indices"}>
									Index
								</Button>
							</CardActions>
						</Card>
						<Card
							style={{maxWidth:"100%", minWidth:'300px',height:'300px', margin:'20px'}}
							variant="outlined"
						>
							<CardContent sx={{textAlign:"center", mt:'80px'}}>
								<ul style={{margin: 0, padding: 0, listStyle: 'none' }}>
									<Typography
										component="li"
										// variant="subtitle1"
										align="center"
									>
										<AppsIcon sx={{ fontSize: '60px', color: 'rgb(149, 117, 205)' }}/>
									</Typography>
								</ul>
							</CardContent>
							<CardActions>
								<Button fullWidth={true} color="secondary" variant="outlined"
										onClick={this.changeUrl} component={Link} to={"/video"}>
									Video
								</Button>
							</CardActions>
						</Card>
					</Stack>
				)
				}
			</Grid>
		</Grid>
	</>
	)};
}
export default App;
