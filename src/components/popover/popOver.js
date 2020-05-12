import React, { Component } from 'react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class PopOver extends Component {
  printDocument() {
      const input = document.getElementById('divToPrint');
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    })
  }

  open(){
    document.getElementById("myNav").style.display="block"
  }

 close(){
    document.getElementById("myNav").style.display="none"
  }

  render() { 
      return ( 
          <React.Fragment>
            <button className="btn btn-primary" onClick={this.open}>View coupon</button>
              <div id="myNav" scroll="no" className="overlay">
                  {/* <!-- Button to close the overlay navigation --> */}
                  <a href="javascript:void(0)" className="closebtn" onClick={this.close}>&times;</a>
                  {/* <!-- Overlay content --> */}
                  <div className="overlay-content">
                  <h4>Scan the QR code below to claim your coupon</h4>
                      <div id="divToPrint">
                        <img src={this.props.image}/>
                      </div>
                    <button onClick={this.printDocument} className="btn btn-primary">Download pdf</button>
                  </div>
               </div>
          </React.Fragment> 
         );
    }
}

export default PopOver;