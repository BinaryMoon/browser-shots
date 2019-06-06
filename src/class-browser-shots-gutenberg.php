<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 * Also register rest route and initialize Gutenberg block.
 *
 * @since   2.7.0
 * @package browser-shots
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
class Browser_Shots_Gutenberg {
	/**
	 * Initialize actions for Gutenberg.
	 *
	 * @since 2.7.0
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'browser_shots_block_assets' ) );
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'rest_api_init', array( $this, 'rest_api_register' ) );
	}

	/**
	 * Enqueue Gutenberg block assets for backend editor.
	 *
	 * @uses {wp-blocks} for block type registration & related functions.
	 * @uses {wp-element} for WP Element abstraction — structure of blocks.
	 * @uses {wp-i18n} to internationalize the block's text.
	 * @uses {wp-editor} for WP editor styles.
	 * @since 2.7.0
	 */
	public function browser_shots_block_assets() {
		// Styles
		wp_enqueue_style(
			'browser-shots-block-css', // Handle.
			plugins_url( '/dist/blocks.editor.build.css', dirname( __FILE__ ) ),
			array(),
			BROWSER_SHOTS_VERSION,
			false // Enqueue the script in the footer.
		);

		// Scripts.
		wp_enqueue_script(
			'browser-shots-block-js', // Handle.
			plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
			BROWSER_SHOTS_VERSION,
			true // Enqueue the script in the footer.
		);
		wp_localize_script(
			'browser-shots-block-js',
			'browsershots',
			array(
				'rest_url' => get_rest_url(),
			)
		);

		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'browser-shots-block-js', 'browsershots' );
		} elseif ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			$locale  = gutenberg_get_jed_locale_data( 'browsershots' );
			$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "browsershots" );';
			wp_script_add_data( 'browser-shots-block-js', 'data', $content );
		} elseif ( function_exists( 'wp_get_jed_locale_data' ) ) {
			/* for 5.0 */
			$locale  = wp_get_jed_locale_data( 'browsershots' );
			$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "browsershots" );';
			wp_script_add_data( 'browser-shots-block-js', 'data', $content );
		}
	}

	/**
	 * Registers the block in PHP and its attributes.
	 *
	 * @since 2.7.0
	 */
	public function register_block() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		register_block_type(
			'browser-shots/browser-shots',
			array(
				'attributes'      => array(
					'html'        => array(
						'type'    => 'string',
						'default' => '',
					),
					'url'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'width'       => array(
						'type'    => 'int',
						'default' => 600,
					),
					'height'     => array(
						'type'    => 'int',
						'default' => 450,
					),
					'alt'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'link'       => array(
						'type'    => 'string',
						'default' => '',
					),
					'target'      => array(
						'type'    => 'string',
						'default' => '',
					),
					'classname'   => array(
						'type'    => 'string',
						'default' => '',
					),
					'image_class' => array(
						'type'    => 'string',
						'default' => 'alignnone',
					),
					'rel'         => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				'render_callback' => array( $this, 'block_frontend' ),
			)
		);
	}

	/**
	 * Registers the rest route for retrieving the browswer shot.
	 *
	 * @since 2.7.0
	 */
	public function rest_api_register() {
		register_rest_route(
			'browsershots/v1',
			'/get_html',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_shortcode_contents' ),
			)
		);
	}

	/**
	 * Rest callback. Gets the Browser Shot shortcode output.
	 *
	 * @since 2.7.0
	 * @see rest_api_register
	 */
	public function get_shortcode_contents() {
		$args         = array(
			'url'         => $_GET['url'],
			'width'       => $_GET['width'],
			'height'      => $_GET['height'],
			'alt'         => $_GET['alt'],
			'link'        => $_GET['link'],
			'target'      => $_GET['target'],
			'class'       => $_GET['class'],
			'image_class' => $_GET['image_class'],
			'rel'         => $_GET['rel'],
		);
		$browsershots = new BrowserShots();
		die( $browsershots->shortcode( $args ) );
	}

	/**
	 * Block front-end output.
	 *
	 * @since 2.7.0
	 * @see register_block
	 *
	 * @param array $attributes Array of passed shortcode attributes.
	 */
	public function block_frontend( $attributes ) {
		if ( is_admin() ) {
			return;
		}
		$args         = array(
			'url'         => $attributes['url'],
			'width'       => $attributes['width'],
			'height'      => $attributes['height'],
			'alt'         => $attributes['alt'],
			'link'        => $attributes['link'],
			'target'      => $attributes['target'],
			'class'       => $attributes['classname'],
			'image_class' => $attributes['image_class'],
			'rel'         => $attributes['rel'],
		);
		$browsershots = new BrowserShots();
		return $browsershots->shortcode( $args );
	}
}
new Browser_Shots_Gutenberg();
