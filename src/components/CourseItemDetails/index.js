import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {fetchedCourseData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.techData()
  }

  onClickRetry = () => {
    this.techData()
  }

  techData = async () => {
    this.setState({apiStatus: apiStatusConstants.pending})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = [data.course_details].map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        fetchedCourseData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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
    const {fetchedCourseData} = this.state
    return (
      <ul className="list">
        {fetchedCourseData.map(each => (
          <li key={each.id} className="list-items">
            <img src={each.imageUrl} alt={each.name} className="course-image" />
            <div className="course">
              <h1 className="course-heading">{each.name}</h1>
              <p className="course-para">{each.description}</p>
            </div>
          </li>
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
      <div className="container">
        <Header />
        {this.renderCourses()}
      </div>
    )
  }
}

export default CourseItemDetails
