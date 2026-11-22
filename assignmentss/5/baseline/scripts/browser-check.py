from playwright.sync_api import sync_playwright
from pathlib import Path
import sys
p=Path(__file__).resolve().parents[1]; draft=False
with sync_playwright() as w:
 b=w.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']); page=b.new_page(viewport={'width':1080,'height':900}); errors=[];page.set_default_timeout(3000);page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content((p/('draft-preview.html' if draft else 'smart-campus-preview.html')).read_text());page.get_by_role('button',name='Check Availability',exact=True).click();page.get_by_text('Unavailable',exact=True).wait_for();page.get_by_role('button',name='Explain availability',exact=True).click();page.get_by_text('Generated explanation (mock)',exact=True).wait_for()
 if draft:
  page.locator('#start-time').fill('11:00');page.locator('#end-time').fill('12:00');assert page.get_by_text('Unavailable',exact=True).is_visible();assert page.get_by_text('Generated explanation (mock)',exact=True).is_visible();print('R2 reproduced: old status and explanation remain after input change.'); page.screenshot(path=str(p/'draft-stale.png'),full_page=True)
 else:
  ev=p/'evidence';ev.mkdir(exist_ok=True);page.screenshot(path=str(ev/'practice11-overlap.png'),full_page=True)
  page.locator('#start-time').fill('11:00');page.locator('#end-time').fill('12:00');assert not page.get_by_text('Unavailable',exact=True).count();assert not page.get_by_text('Generated explanation (mock)',exact=True).count();page.get_by_role('button',name='Check Availability',exact=True).click();page.get_by_text('Available',exact=True).wait_for();page.get_by_role('button',name='Explain availability',exact=True).click();page.get_by_text('Generated explanation (mock)',exact=True).wait_for();page.screenshot(path=str(ev/'practice11-available.png'),full_page=True)
  for mode in ['timeout','error','unavailable']:
   page.locator('#mock-mode').select_option(mode);page.get_by_role('button',name='Explain availability',exact=True).click();page.get_by_text('Deterministic fallback (mock unavailable)',exact=True).wait_for();assert page.get_by_text('Available',exact=True).is_visible()
   if mode=='timeout':page.screenshot(path=str(ev/'practice11-timeout.png'),full_page=True)
  page.get_by_role('checkbox',name='Toggle room blocked').check(force=True);assert not page.get_by_text('Available',exact=True).count();page.get_by_role('button',name='Check Availability',exact=True).click();page.get_by_role('button',name='Explain availability',exact=True).click();page.get_by_text('The room is blocked and cannot be booked.',exact=True).wait_for();assert page.get_by_text('Unavailable',exact=True).is_visible()
  page.locator('#start-time').fill('');page.get_by_role('button',name='Check Availability',exact=True).click();page.get_by_role('button',name='Explain availability',exact=True).click();page.get_by_text('Explanation rejected',exact=True).wait_for();assert page.get_by_text('Unavailable',exact=True).is_visible()
  page=b.new_page(viewport={'width':390,'height':844});page.set_default_timeout(3000);page.on('pageerror',lambda e:errors.append(str(e)));page.set_content((p/'smart-campus-preview.html').read_text());page.get_by_role('button',name='Check Availability',exact=True).click();page.get_by_role('button',name='Explain availability',exact=True).click();page.get_by_text('Generated explanation (mock)',exact=True).wait_for();assert page.evaluate('document.documentElement.scrollWidth <= innerWidth');page.screenshot(path=str(ev/'practice11-mobile.png'),full_page=True)
  print('Browser checks passed: overlap, available, stale reset, timeout, error, missing key, blocked, empty, mobile.');print('Browser errors:',errors);assert not errors
 b.close()
