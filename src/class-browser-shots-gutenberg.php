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
		add_action( 'enqueue_block_assets', array( $this, 'add_frontend_styles' ) );
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
	public function add_frontend_styles() {
		// Styles
		wp_enqueue_style(
			'browser-shots-frontend-css', // Handle.
			plugins_url( '/dist/blocks.style.build.css', dirname( __FILE__ ) ),
			array(),
			BROWSER_SHOTS_VERSION,
			'all' // Enqueue the script in the footer.
		);
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
			'all' // Enqueue the script in the footer.
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
				'nonce'    => wp_create_nonce( 'wp_rest' ),
			)
		);

		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'browser-shots-block-js', 'browser-shots' );
		} elseif ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			$locale  = gutenberg_get_jed_locale_data( 'browser-shots' );
			$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "browser-shots" );';
			wp_script_add_data( 'browser-shots-block-js', 'data', $content );
		} elseif ( function_exists( 'wp_get_jed_locale_data' ) ) {
			/* for 5.0 */
			$locale  = wp_get_jed_locale_data( 'browser-shots' );
			$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "browser-shots" );';
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
						'default' => 'center',
					),
					'rel'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'image_size'  => array(
						'type'    => 'string',
						'default' => 'medium',
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
		if ( is_user_logged_in() && current_user_can( 'edit_posts' ) ) {
			$args         = array(
				'url'         => esc_url_raw( $_GET['url'] ),
				'width'       => absint( $_GET['width'] ),
				'height'      => absint( $_GET['height'] ),
				'alt'         => sanitize_text_field( $_GET['alt'] ),
				'link'        => ! empty( $_GET['link'] ) ? esc_url_raw( $_GET['link'] ) : '',
				'target'      => sanitize_text_field( $_GET['target'] ),
				'class'       => sanitize_text_field( $_GET['class'] ),
				'image_class' => sanitize_text_field( $_GET['image_class'] ),
				'rel'         => sanitize_text_field( $_GET['rel'] ),
				'nolink'      => true,
			);
			$browsershots = new BrowserShots();
			die( wp_kses_post( $browsershots->shortcode( $args ) ) );
		}
		die( esc_html__( 'Browser Shots could not retrieve the image', 'browser-shots' ) );
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
			'url'         => esc_url_raw( $attributes['url'] ),
			'width'       => absint( $attributes['width'] ),
			'height'      => absint( $attributes['height'] ),
			'alt'         => sanitize_text_field( $attributes['alt'] ),
			'link'        => ! empty( $attributes['link'] ) ? esc_url_raw( $attributes['link'] ) : '',
			'target'      => sanitize_text_field( $attributes['target'] ),
			'class'       => sanitize_text_field( $attributes['classname'] ),
			'image_class' => sanitize_text_field( 'align' . $attributes['image_class'] ),
			'rel'         => sanitize_text_field( $attributes['rel'] ),
		);
		$browsershots = new BrowserShots();
		return wp_kses_post( $browsershots->shortcode( $args ) );
	}
}
new Browser_Shots_Gutenberg();
