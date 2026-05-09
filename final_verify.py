import os
from playwright.sync_api import sync_playwright

def final_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        try:
            print("Navigating to Aether...")
            page.goto("http://localhost:3000")
            page.wait_for_timeout(3000)

            # Open Library
            page.click("text=Add first step...")
            page.wait_for_timeout(1000)

            # Test filtering: Click "AI"
            page.click("nav button:has-text('AI')")
            page.wait_for_timeout(500)
            page.screenshot(path="/home/jules/aether_library_filtered.png")
            print("Captured filtered library.")

            # Add OpenAI
            page.click("text=OpenAI")
            page.wait_for_timeout(1000)

            # Screenshot the canvas with the node
            page.screenshot(path="/home/jules/aether_fixed_node.png")
            print("Captured canvas with fixed node.")

            # Open properties
            page.click("text=OpenAI", force=True)
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/aether_property_drawer.png")
            print("Captured property drawer.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    final_verification()
