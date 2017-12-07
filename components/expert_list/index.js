import React, { Component } from 'react';

class ExpertsList extends Component {
  render() {
    return (
      <div>
      <section>
      <div>Expert curated by Lynk: </div>
      <div>Need action:</div>
  </section>

  <section>
      <div style={{display: 'flex'}}>
          <img style={{width: 30, height: 30}} src='https://media-exp2.licdn.com/media/AAIA_wDGAAAAAQAAAAAAAAyrAAAAJGZkYjAxMTczLTQ1NTEtNDQ5YS1iYTAyLTY1Yzc2ZDQwMzRiOA.jpg' alt=''/>
          <div>
              <div>mike mike</div>
              <div>hero</div>
          </div>
      </div>
      <div>
          <h3>Relevant Experience:</h3>
          <div>
          -  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          -  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          - Duis aute irure dolor in reprehenderit in voluptate velit esse cillum fugiat nulla pariatur.
          </div>
          <h3>Work History:</h3>
          <div>
          -  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          -  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          - Duis aute irure dolor in reprehenderit in voluptate velit esse cillum fugiat nulla pariatur.                           </div>
      </div>
      <div>
          <button className='btn'>Schedlue call</button>
          <button className='btn'>Decline</button>
      </div>
  </section>

  <div style={{display: 'flex', maxWidth: 300, width: '100%', alignItems: 'center'}}>
      <button className='btn'> left </button>
      <div style={{flex: 1, textAlign: 'center'}}>1 of 2</div>
      <button className='btn'> right </button>
  </div>

      </div>
    );
  }
}

export default ExpertsList;