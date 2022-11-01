import pytz
from datetime import datetime

from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

sg = SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
from_email = settings.SENDER_EMAIL


def send_verification_email(to_email, verification_url):
  subject = 'Verify your email address | Progressor'
  text_content = f"Hi,\n\nGreeting from Progressor!\n\nFollow the link to verify your account: {verification_url}\n\nRegards,\nAjinkya Deshpande"

  message = Mail(from_email, to_email, subject, text_content)
  response = sg.send(message)
  return response.status_code


def send_email(to_email, subject, data):
  text_content = get_text_content(data)
  html_content = get_html_content(data)
  message = Mail(from_email, to_email, subject, text_content, html_content)
  response = sg.send(message)
  return response.status_code


def get_date():
  IST = pytz.timezone('Asia/Calcutta')
  today = datetime.date(datetime.now(IST)).strftime("%B %d, %Y")
  return today


def get_text_content(data):
  return "Leetcode Initial Data"


def get_html_content(data):
  return f"""
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
    </head>
    <body style="background-color:#f6f9fc;margin:0;padding:0;font-family:sans-serif;">
      <center class="main-wrapper" style="width:100%;table-layout:fixed;background-color:#f6f9fc;margin-top:40px;">
        <div class="webkit" style="max-width:600px;background-color:#ffffff;">
          <table class="outer" align="center" style="margin:0 auto;width:100%;max-width:600px;">
            <tr>
              <td>
                <table width="100%" style="margin-top:40px">
                  <tr>
                    <td style="width: 40%; text-align: right;">
                      <img src="https://i.postimg.cc/Y2WQLFmz/logo.png" alt="logo" width="80" style="margin-right: 20px;">
                    </td>
                    <td style="text-align:left">
                      <h1>Progressor</h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%" style="margin-top:20px; color:#00a3ff">
                  <tr>
                    <td style="text-align: center">
                      <h2 style="margin:0">{data['user']['name']}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center">
                      <h2 style="margin:0">({get_date()})</h2>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%" style="margin-top:30px">
                  <tr>
                    <td>
                      <h2 style="padding-left:30px; margin:0">Leetcode User Data</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 30px">
                      <table width="100%" style="margin:20px auto; border-collapse: collapse">
                        <tr style="background-color:#000; color:#fff">
                          <td style="width:50%; text-align:center; padding:20px">
                            Total Questions
                          </td>
                          <td style="text-align:center">{data['total_questions']}</td>
                        </tr>
                        <tr style="background-color:#eeeeee">
                          <td style="width:50%; text-align:center; padding:15px">
                            Easy
                          </td>
                          <td style="text-align:center">{data['easy_questions']}</td>
                        </tr>
                        <tr>
                          <td style="width:50%; text-align:center; padding:15px">
                            Medium
                          </td>
                          <td style="text-align:center">{data['medium_questions']}</td>
                        </tr>
                        <tr style="background-color:#eeeeee">
                          <td style="width:50%; text-align:center; padding:15px">
                            Hard
                          </td>
                          <td style="text-align:center">{data['hard_questions']}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center">
                      <div style="margin:25px 0">
                        <a style="
                            text-decoration:none;
                            color:#000;
                            padding:15px;
                            background-color:#5a18fb;
                            border-radius:50px;
                          " href="https://progressor.vercel.app/">Go to Website</a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>
  """
