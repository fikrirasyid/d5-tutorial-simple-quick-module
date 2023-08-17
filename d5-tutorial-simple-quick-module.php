<?php
/*
Plugin Name: Divi 5 Tutorial Simple Quick Module
Plugin URI:
Description: Plugin reference for creating simple and quick Divi 5 Module.
Version:     1.0.0
Author:      Elegant Themes
Author URI:  https://elegantthemes.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// Setup constants.
define( 'D5_TUTORIAL_SIMPLE_QUICK_MODULE_PATH', plugin_dir_path( __FILE__ ) );
define( 'D5_TUTORIAL_SIMPLE_QUICK_MODULE_URL', plugin_dir_url( __FILE__ ) );

// Load Divi 5 modules.
require_once D5_TUTORIAL_SIMPLE_QUICK_MODULE_PATH . 'server/index.php';

/**
 * Enqueue Divi 5 Visual Builder Assets
 */
function d5_tutorial_simple_quick_module_enqueue_visual_builder_assets() {
	if ( et_core_is_fb_enabled() && et_builder_d5_enabled() ) {
		wp_enqueue_script(
			'd5-tutorial-simple-quick-module-visual-builder',
			D5_TUTORIAL_SIMPLE_QUICK_MODULE_URL . 'visual-builder/build/d5-tutorial-simple-quick-module.js',
			[
				'react',
				'jquery',
				'divi-module-library',
				'wp-hooks',
				'divi-rest',
			],
			'1.0.0',
			true
		);
	}

	// Ensure module style will be enqueued on Visual Builder even when `should_load_separate_core_block_assets`
	// filter returns `true` which means module style is only being enqueued when module is saved on the page.
	wp_enqueue_style( 'd5-tutorial-simple-quick-module-style' );
}

add_action( 'et_vb_assets_before_enqueue_packages', 'd5_tutorial_simple_quick_module_enqueue_visual_builder_assets' );

/**
 * Register Module Assets
 */
function d5_tutorial_simple_quick_module_assets() {
	wp_register_style(
		'd5-tutorial-simple-quick-module-style',
		D5_TUTORIAL_SIMPLE_QUICK_MODULE_URL . 'style.css',
		[]
	);
}
add_action( 'wp_enqueue_scripts', 'd5_tutorial_simple_quick_module_assets' );
