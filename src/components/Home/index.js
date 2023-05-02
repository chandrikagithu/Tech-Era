import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import CourseItem from '../CourseItem/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {fetchedData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.techData()
  }

  techData = async () => {
    this.setState({apiStatus: apiStatusConstants.pending})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        fetchedData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.techData()
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong.</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderTechList = () => {
    const {fetchedData} = this.state
    return (
      <ul className="list">
        {fetchedData.map(each => (
          <CourseItem key={each.id} each={each} />
        ))}
      </ul>
    )
  }

  renderCourses = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTechList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.pending:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-inside-container">
          <h1 className="home-title">Courses</h1>
          {this.renderCourses()}
        </div>
      </div>
    )
  }
}

export default Home
