import os

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

BASE_URL = 'https://leetcode.com'


def make_request(driver, username):
  # Get Leetcode Profile Page
  URL = f'{BASE_URL}/{username}'
  driver.get(URL)
  driver.implicitly_wait(10)

  levels = ['Easy', 'Medium', 'Hard']
  leetcode_data = {'total_questions': 0}
  error = None

  try:
    for level in levels:
      level_container = driver.find_element(
        By.XPATH, f"//div[contains(text(), '{level}')]/following-sibling::div")

      level_data = level_container.find_element(By.TAG_NAME, 'span')

      # Update Leetcode Data Dict
      leetcode_data[f'{level.lower()}_questions'] = int(level_data.text)
      leetcode_data['total_questions'] += int(level_data.text)
  except Exception as e:
    error = 'Something went wrong!'

  if error is None:
    driver.quit()
    return (leetcode_data, error,)

  # Check old UI
  try:
    error = None
    for level in levels:
      level_div = driver.find_element(
        By.CSS_SELECTOR, f"div[data-difficulty='{level}']")
      leetcode_data[f'{level.lower()}_questions'] = int(
        level_div.find_element_by_tag_name('span').get_attribute('innerHTML'))
      leetcode_data['total_questions'] += leetcode_data[level.lower()]
  except Exception as e:
    error = 'Data not found for the given username!!'

  driver.quit()
  return (leetcode_data, error,)


def get_leetcode_data(username):
  if os.environ.get('DYNO') is not None:
    # Prod Mode
    options = webdriver.ChromeOptions()
    options.binary_location = os.environ.get('GOOGLE_CHROME_BIN')
    options.add_argument('--headless')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--no-sandbox')

    driver = webdriver.Chrome(executable_path=os.environ.get(
      'CHROMEDRIVER_PATH'), options=options)

    return make_request(driver, username)
  else:
    # Dev Mode
    options = webdriver.ChromeOptions()
    options.headless = True

    driver = webdriver.Chrome(service=Service(
      ChromeDriverManager().install()), options=options)

    return make_request(driver, username)
